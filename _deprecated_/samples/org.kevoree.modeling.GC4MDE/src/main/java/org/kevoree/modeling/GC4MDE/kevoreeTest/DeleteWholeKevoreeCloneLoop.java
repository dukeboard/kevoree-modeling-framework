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

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 16/04/13
 * Time: 09:54
 */
public class DeleteWholeKevoreeCloneLoop extends SimpleKevoreeCloneLoop {

    public static void main(String[] args) {
        new DeleteWholeKevoreeCloneLoop().doTest();
    }

    @Override
    public void cleanupModel(ContainerRoot model) {
        model.delete();
        model = null;
    }
}
