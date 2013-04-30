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
 * These classes model the data that is collected by the caliper {@linkplain
 * com.google.caliper.runner runner}: the record of which scenarios were tested on which VMs by
 * which instruments and, most importantly, all the measurements that were observed. The goal of
 * these classes is to be as easily convertible back and forth to JSON text as possible.
 *
 * <p>We've kept them very quick-and-dirty for now (public mutable fields!?!), but may buff them up
 * after things stabilize.
 */
package com.google.caliper.model;