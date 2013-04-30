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
package com.google.caliper;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;

import java.util.ArrayList;
import java.util.List;

final class StandardVm extends Vm {

  @Override public List<String> getVmSpecificOptions(MeasurementType type, Arguments arguments) {
    if (!arguments.getCaptureVmLog()) {
      return ImmutableList.of();
    }

    List<String> result = new ArrayList<String>();
    result.add("-verbose:gc");
    result.add("-Xbatch");
    result.add("-XX:+UseSerialGC");
    if (type == MeasurementType.TIME) {
      return Lists.newArrayList("-XX:+PrintCompilation");
    }

    return result;
  }

  public static String defaultVmName() {
    return "java";
  }
}
