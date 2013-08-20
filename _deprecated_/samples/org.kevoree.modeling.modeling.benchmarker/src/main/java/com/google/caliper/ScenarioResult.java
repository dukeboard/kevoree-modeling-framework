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

import com.google.common.annotations.GwtCompatible;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * Holds the results for a particular scenario, including timing measurements, memory use
 * measurements, and event logs for both, recording significant events during measurement.
 *
 * WARNING: a JSON representation of this class is stored on the app engine server. If any changes
 * are made to this class, a deserialization adapter must be written for this class to ensure
 * backwards compatibility.
 *
 * <p>Gwt-safe.
 */
@SuppressWarnings({"serial", "FieldMayBeFinal"})
@GwtCompatible
public final class ScenarioResult
    implements Serializable /* for GWT Serialization */ {

  // want these to be EnumMaps, but that upsets GWT
  private /*final*/ Map<String, MeasurementSet> measurementSetMap
      = new HashMap<String, MeasurementSet>();
  private /*final*/ Map<String, String> eventLogMap
      = new HashMap<String, String>();

  public ScenarioResult(MeasurementSet timeMeasurementSet,
      String timeEventLog, MeasurementSet instanceMeasurementSet,
      String instanceEventLog, MeasurementSet memoryMeasurementSet,
      String memoryEventLog) {
    if (timeMeasurementSet != null) {
      measurementSetMap.put(MeasurementType.TIME.toString(), timeMeasurementSet);
      eventLogMap.put(MeasurementType.TIME.toString(), timeEventLog);
    }
    if (instanceMeasurementSet != null) {
      measurementSetMap.put(MeasurementType.INSTANCE.toString(), instanceMeasurementSet);
      eventLogMap.put(MeasurementType.INSTANCE.toString(), instanceEventLog);
    }
    if (memoryMeasurementSet != null) {
      measurementSetMap.put(MeasurementType.MEMORY.toString(), memoryMeasurementSet);
      eventLogMap.put(MeasurementType.MEMORY.toString(), memoryEventLog);
    }
  }

  public MeasurementSet getMeasurementSet(MeasurementType type) {
    return measurementSetMap.get(type.toString());
  }

  public String getEventLog(MeasurementType type) {
    return eventLogMap.get(type.toString());
  }

  @Override public boolean equals(Object o) {
    return o instanceof ScenarioResult
        && ((ScenarioResult) o).measurementSetMap.equals(measurementSetMap)
        && ((ScenarioResult) o).eventLogMap.equals(eventLogMap);
  }

  @Override public int hashCode() {
    return measurementSetMap.hashCode() * 37 + eventLogMap.hashCode();
  }

  @Override public String toString() {
    return "measurementSetMap: " + measurementSetMap + ", eventLogMap: " + eventLogMap;
  }

  @SuppressWarnings("unused")
  private ScenarioResult() {} // for GWT Serialization
}
