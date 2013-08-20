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
package org.kevoree.modeling.GC4MDE.kevoreeTest;

import org.kevoree.ContainerRoot;
import org.kevoree.KevoreeFactory;
import org.kevoree.impl.FlyweightKevoreeFactory;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 16/04/13
 * Time: 10:28
 */
public class FlyWeightKevoreeCloneLoop extends DeleteWholeKevoreeCloneLoop {

    private FlyweightKevoreeFactory flyf = new FlyweightKevoreeFactory();

    @Override
    public void cleanupModel(ContainerRoot model) {
        flyf.restack(model);
        model.delete();
    }

    @Override
    public KevoreeFactory createFactory() {
        flyf.setMaxStackSize(500);
        return flyf;
    }
}
