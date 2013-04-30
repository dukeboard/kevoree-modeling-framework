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

import com.google.gson.JsonParseException;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Helps with deserialization of results, given uncertainty about the format (xml or json) they
 * are in.
 */
public final class ResultsReader {
  public Result getResult(InputStream in) throws IOException {
    // save input into a byte array since we may need to read it twice
    byte[] postedData = readAllBytes(in);
    Result result;
    InputStreamReader baisJsonReader = new InputStreamReader(new ByteArrayInputStream(postedData));
    try {
      result = Json.getGsonInstance().fromJson(baisJsonReader, Result.class);
    } catch (JsonParseException e) {
      // probably an old client is trying to send data, so try to parse it as XML instead.
      ByteArrayInputStream baisXml = new ByteArrayInputStream(postedData);
      try {
        result = Xml.resultFromXml(baisXml);
      } catch (Exception e2) {
        throw new RuntimeException(e);
      } finally {
        baisXml.close();
      }
    } finally {
      baisJsonReader.close();
    }
    return result;
  }

  private byte[] readAllBytes(InputStream in) throws IOException {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    byte[] buf = new byte[4096];
    int read;
    while ((read = in.read(buf)) != -1) {
      baos.write(buf, 0, read);
    }
    return baos.toByteArray();
  }
}
