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
package com.google.caliper.runner;

import static com.google.common.base.Preconditions.checkArgument;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.ImmutableSetMultimap;
import com.google.common.collect.Lists;
import com.google.common.collect.SetMultimap;
import com.google.common.collect.Sets;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * A set of {@link Scenario scenarios} constructed by taking all possible combinations of benchmark
 * methods, user parameters, VM specs and VM arguments.
 */
public final class FullCartesianScenarioSelection implements ScenarioSelection {
  private final ImmutableSet<BenchmarkMethod> benchmarkMethods;
  private final ImmutableSet<VirtualMachine> vms;
  private final ImmutableSetMultimap<String, String> userParameters;

  public FullCartesianScenarioSelection(
      Collection<BenchmarkMethod> benchmarkMethods,
      Collection<VirtualMachine> vms,
      SetMultimap<String, String> userParameters) {
    this.benchmarkMethods = ImmutableSet.copyOf(benchmarkMethods);
    this.vms = ImmutableSet.copyOf(vms);
    this.userParameters = ImmutableSetMultimap.copyOf(userParameters);

    checkArgument(!benchmarkMethods.isEmpty());
    checkArgument(!vms.isEmpty());
  }

  @Override public ImmutableSet<BenchmarkMethod> benchmarkMethods() {
    return benchmarkMethods;
  }

  @Override public ImmutableSet<VirtualMachine> vms() {
    return vms;
  }

  @Override public ImmutableSetMultimap<String, String> userParameters() {
    return userParameters;
  }

  @Override public ImmutableSet<Scenario> buildScenarios() {
    List<Scenario> tmp = Lists.newArrayList();
    for (BenchmarkMethod benchmarkMethod : benchmarkMethods) {
      for (VirtualMachine vm : vms) {
        for (List<String> userParamsChoice : cartesian(userParameters)) {
          ImmutableMap<String, String> theseUserParams =
              zip(userParameters.keySet(), userParamsChoice);
          tmp.add(new Scenario(benchmarkMethod, theseUserParams, vm));
        }
      }
    }
    return ImmutableSet.copyOf(tmp);
  }

  protected static <T> Set<List<T>> cartesian(SetMultimap<String, T> multimap) {
    @SuppressWarnings({"unchecked", "rawtypes"}) // promised by spec
    ImmutableMap<String, Set<T>> paramsAsMap = (ImmutableMap) multimap.asMap();
    return Sets.cartesianProduct(paramsAsMap.values().asList());
  }

  protected static <K, V> ImmutableMap<K, V> zip(Set<K> keys, Collection<V> values) {
    ImmutableMap.Builder<K, V> builder = ImmutableMap.builder();

    Iterator<K> keyIterator = keys.iterator();
    Iterator<V> valueIterator = values.iterator();

    while (keyIterator.hasNext() && valueIterator.hasNext()) {
      builder.put(keyIterator.next(), valueIterator.next());
    }

    if (keyIterator.hasNext() || valueIterator.hasNext()) {
      throw new AssertionError(); // I really screwed up, then.
    }
    return builder.build();
  }

  @Override public String selectionType() {
    return "Full cartesian product";
  }
}
