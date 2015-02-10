import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.KDataBase;
import voldemort.client.ClientConfig;
import voldemort.client.SocketStoreClientFactory;
import voldemort.client.StoreClient;
import voldemort.client.StoreClientFactory;
import voldemort.server.VoldemortConfig;
import voldemort.server.VoldemortServer;
import voldemort.versioning.Versioned;

import java.util.Arrays;
import java.util.Map;

/**
 * Created by cyril on 10/02/15.
 */
public class VoldemortDataBase implements KDataBase {

private StoreClient<String, String> client = null;
private StoreClientFactory factory = null;

        public VoldemortDataBase(String storeName, String bootstrapUrl) {
            System.err.println("===================================================================");
            System.err.println("==                            Voldemort                          ==");
            System.err.println("===================================================================");

            VoldemortConfig config = VoldemortConfig.loadFromVoldemortHome(this.getClass().getClassLoader().getResource("./").getPath());
            VoldemortServer server = new VoldemortServer(config);
            server.start();
            // In real life this stuff would get wired in
            factory = new SocketStoreClientFactory(new ClientConfig().setBootstrapUrls(bootstrapUrl));

            client = factory.getStoreClient(storeName);
        }

        @Override
        public void get(String[] keys, ThrowableCallback<String[]> callback) {
            Iterable<String> iter = Arrays.asList(keys);
            Map<String, Versioned<String>> values = client.getAll(iter);
            if (callback != null) {
                callback.on(values.values().toArray(new String[values.size()]), null);
            }
        }

        @Override
        public void put(String[][] payloads, Callback<Throwable> error) {
            String[] elems = new String[payloads.length * 2];
            if (client != null) {
                for (int i = 0; i < payloads.length; i++) {
                    client.put(payloads[i][0], payloads[i][1]);
                }
            }
            if (error != null) {
                error.on(null);
            }
        }

        @Override
        public void remove(String[] keys, Callback<Throwable> error) {
            //client.delete( keys );
        }

        @Override
        public void commit(Callback<Throwable> error) {

        }

        @Override
        public void connect(Callback<Throwable> callback) {
            if(callback != null){
                callback.on(null);
            }
        }

        @Override
        public void close(Callback<Throwable> callback) {
            factory.close();
        }
}
