package org.kevoree.modeling.drivers.mongodb;

import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.MongodConfig;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;
import junit.framework.Assert;
import org.kevoree.modeling.KCallback;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.meta.KPrimitiveTypes;
import org.kevoree.modeling.meta.dynamic.DynamicKModel;
import org.kevoree.modeling.meta.dynamic.DynamicMetaClass;
import org.kevoree.modeling.meta.dynamic.DynamicMetaModel;

import java.io.IOException;
import java.net.UnknownHostException;

/**
 * Created by duke on 12/05/15.
 */
public class MongoDbTest {

    //@Test
    public void test() throws UnknownHostException {

        MongodConfig mongodConfig = new MongodConfig(Version.Main.PRODUCTION, 27017, Network.localhostIsIPv6());
        MongodStarter runtime = MongodStarter.getDefaultInstance();
        MongodExecutable mongodExecutable = null;
        try {
            mongodExecutable = runtime.prepare(mongodConfig);
            MongodProcess mongod = mongodExecutable.start();
            MongoDbContentDeliveryDriver driver = new MongoDbContentDeliveryDriver("localhost", 27017, "kmf");
            DynamicMetaModel metaModel = new DynamicMetaModel("IoT");
            DynamicMetaClass metaClass = metaModel.createMetaClass("Sensor");
            metaClass.addAttribute("name", KPrimitiveTypes.STRING);
            DynamicKModel model = new DynamicKModel();
            model.setMetaModel(metaModel);
            model.setContentDeliveryDriver(driver);
            model.connect(new KCallback() {
                @Override
                public void on(Object o) {
                    KObject sensor = model.createByName("Sensor", 0, 0);
                    sensor.setByName("name", "hello");
                    model.save(new KCallback() {
                        @Override
                        public void on(Object o) {
                            model.manager().cache().clear(metaModel);
                            model.manager().lookup(0, 0, sensor.uuid(), new KCallback<KObject>() {
                                @Override
                                public void on(KObject kObject) {
                                    Assert.assertEquals(kObject.toString(), "{\"@class\":\"Sensor\",\"@uuid\":1,\"name\":\"hello\"}");
                                }
                            });
                        }
                    });
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (mongodExecutable != null)
                mongodExecutable.stop();
        }
    }

}
