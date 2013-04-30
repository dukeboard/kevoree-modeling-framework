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
package com.google.caliper.api;

/**
 * Throw this exception from your benchmark class's setUp method, or benchmark method
 * to indicate that the combination of parameters supplied should not be benchmarked. For example,
 * while you might want to test <i>most</i> combinations of the parameters {@code size} and {@code
 * comparator}, you might not want to test the specific combination of {@code size=100000000} and
 * {@code comparator=reallyExpensiveComparator}.
 */
@SuppressWarnings("serial")
public final class SkipThisScenarioException extends RuntimeException {}
