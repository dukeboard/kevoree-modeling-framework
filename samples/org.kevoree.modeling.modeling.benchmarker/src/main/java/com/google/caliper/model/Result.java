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
package com.google.caliper.model;

import java.util.List;

/**
 * A set of measurements, optionally including arbitrary report text, that were taken by a
 * particular instrument for a particular scenario.
 */
public class Result {
  public String localName;

  public String scenarioLocalName;
  public String instrumentLocalName;

  public List<String> vmCommandLine;

  public List<Measurement> measurements;
  public List<String> messages;

  public static Result fromString(String json) {
    return ModelJson.fromJson(json, Result.class);
  }

  @Override public String toString() {
    return ModelJson.toJson(this);
  }
}
