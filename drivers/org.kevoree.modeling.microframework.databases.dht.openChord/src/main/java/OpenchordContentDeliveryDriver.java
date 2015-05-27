/**
 * Created by cyril on 26/05/15.
 */

import de.uniba.wiai.lspi.chord.console.command.entry.Key;
import de.uniba.wiai.lspi.chord.data.URL;
import de.uniba.wiai.lspi.chord.service.Chord;
import de.uniba.wiai.lspi.chord.service.PropertiesLoader;
import de.uniba.wiai.lspi.chord.service.ServiceException;
import de.uniba.wiai.lspi.chord.service.impl.ChordImpl;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.msg.KEventMessage;

import java.io.Serializable;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.UnknownHostException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class OpenchordContentDeliveryDriver implements KContentDeliveryDriver {

    private Chord chord=null;

    public OpenchordContentDeliveryDriver() {
        PropertiesLoader.loadPropertyFile();
    }

    public void start(boolean root){
        String protocol = URL.KNOWN_PROTOCOLS.get(/*URL.LOCAL_PROTOCOL*/URL.SOCKET_PROTOCOL);
        String address = "localhost";
        int port=8080;
        this.chord = new ChordImpl();
        if(root){

            root(protocol, address, port);
        } else {
            peer(protocol, address, port);
        }
        System.out.println("My ID is "+this.chord.getID());
        String[] succ = ((ChordImpl)this.chord).printSuccessorList().split("\n");
        String successor=null;
        for (int i = 0; i < succ.length; i++) {
            if(i>0){
                successor=succ[i].toString().trim();
                System.out.println("Successor List "+successor);
                //routingTable.add(successor);
            }
        }
    }
    public void root(String protocol, String address, int port) {
        URL localURL = null;
        try {
            //address = InetAddress.getLocalHost().toString();
            //address = address.substring(address.indexOf("/") + 1, address.length());
            localURL = new URL(protocol + "://" +address+":"+port+"/");
            System.out.println("Local address: "+address+" on port "+port);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        try {
            chord.create(localURL);
        } catch (ServiceException e) {
            throw new RuntimeException("Could not create DHT!", e);
        }
        System.out.println("[DB] Creating DHT: " + chord.toString());
    }

    public void peer(String protocol, String address, int port) {
        URL localURL = null;
        try {
            localURL = new URL(protocol + "://" +address+":"+8181+"/");
            System.out.println("Local address: "+address+" on port ");
            URL bootstrapURL = new URL(protocol+"://"+address+":"+port+"/");
            chord.join(localURL, bootstrapURL);
        } catch (ServiceException e) {
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void atomicGetMutate(KContentKey kContentKey, AtomicOperation atomicOperation, ThrowableCallback<String> throwableCallback) {

    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        List<String> values = new LinkedList<String>();
        for (int i = 0; i < keys.length; i++) {
            try {
                Set<Serializable> sette = chord.retrieve(new Key(keys[i].toString()));
                Iterator<Serializable> it = sette.iterator();
                while( it.hasNext() ){
                    values.add( it.next().toString() );
                }
            } catch (ServiceException e) {
                e.printStackTrace();
            }
        }
        if (callback != null) {
            callback.on(values.toArray(new String[values.size()]), null);
        }
    }

    @Override
    public void put(KContentPutRequest request, Callback<Throwable> error) {
        String[] elems = new String[request.size() * 2];
        for (int i = 0; i < request.size(); i++) {
            try {
                this.chord.insert(new Key(request.getKey(i).toString()),request.getContent(i));
            } catch (ServiceException e) {
                System.err.println("The "+i+" insertion fail");
                e.printStackTrace();
            }
        }
        if (error != null) {
            error.on(null);
        }
    }

    @Override
    public void remove(String[] strings, Callback<Throwable> callback) {

    }

    @Override
    public void connect(Callback<Throwable> callback) {
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {

    }

    @Override
    public void registerListener(Object o, KEventListener kEventListener, Object o1) {

    }

    @Override
    public void unregister(KEventListener kEventListener) {

    }

    @Override
    public void send(KEventMessage[] kEventMessages) {

    }

    @Override
    public void sendOperation(KEventMessage kEventMessage) {

    }

    @Override
    public void setManager(KDataManager kDataManager) {

    }
}
