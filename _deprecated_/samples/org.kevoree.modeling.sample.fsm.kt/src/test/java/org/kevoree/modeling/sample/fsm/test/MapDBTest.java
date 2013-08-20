/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * Fouquet Francois
 * Nain Gregory
 */
/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * 	Fouquet Francois
 * 	Nain Gregory
 */
package org.kevoree.modeling.sample.fsm.test;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 12/03/13
* (c) 2013 University of Luxembourg – Interdisciplinary Centre for Security Reliability and Trust (SnT)
* All rights reserved
*/

import org.mapdb.BTreeMap;
import org.mapdb.DB;
import org.mapdb.DBMaker;

import java.io.File;
import java.util.ArrayList;

public class MapDBTest {


    public static void main(String[] args) {
        File f = new File("/tmp/testFSM" + System.currentTimeMillis());
        f.mkdirs();
        DBMaker res = DBMaker.newFileDB(new File(f.getAbsolutePath() + File.separator + "/org.fsmSample.FSM_entity"));
        System.out.println(res.getClass());
        res.cacheWeakRefEnable();
        System.out.println(res.getClass());
        res.closeOnJvmShutdown();
        System.out.println(res.getClass());
        DB db = res.make();

        System.out.println(db.getEngine() .getClass());
        BTreeMap map = db.getTreeMap("default");

        ArrayList<String> list = new ArrayList<String>();
        list.add("Value1");
        list.add("Value2");

        map.put("key1", list);
        map.put("key2", "String 2");
        db.commit();
        db.close();

        DB db2 = res.make();




    }




}
