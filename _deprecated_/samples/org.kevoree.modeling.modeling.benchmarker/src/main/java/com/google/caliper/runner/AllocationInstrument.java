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
// Copyright 2011 Google Inc. All Rights Reserved.

package com.google.caliper.runner;

import static com.google.common.base.Throwables.propagateIfInstanceOf;

import com.google.caliper.api.Benchmark;
import com.google.caliper.api.SkipThisScenarioException;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * {@link Instrument} that watches the memory allocations in an invocation of the
 * benchmark method and reports some statistic. The benchmark method must accept a
 * single int argument 'reps', which is the number of times to execute the guts of
 * the benchmark method, and it must be public and non-static.
 */
abstract class AllocationInstrument extends Instrument {
  @Override public boolean isBenchmarkMethod(Method method) {
    return Instrument.isTimeMethod(method);
  }

  @Override public BenchmarkMethod createBenchmarkMethod(BenchmarkClass benchmarkClass,
      Method method) throws InvalidBenchmarkException {

    return Instrument.createBenchmarkMethodFromTimeMethod(benchmarkClass, method);
  }

  @Override
  public void dryRun(Benchmark benchmark, BenchmarkMethod benchmarkMethod)
      throws UserCodeException {

    // execute the benchmark method, but don't try to take any measurements, because this JVM
    // may not have the allocation instrumenter agent.
    Method m = benchmarkMethod.method();
    try {
      m.invoke(benchmark, 1);
    } catch (IllegalAccessException impossible) {
      throw new AssertionError(impossible);
    } catch (InvocationTargetException e) {
      Throwable userException = e.getCause();
      propagateIfInstanceOf(userException, SkipThisScenarioException.class);
      throw new UserCodeException(userException);
    }
  }

  /**
   * This instrument's worker requires the allocationinstrumenter agent jar, specified
   * on the worker VM's command line with "-javaagent:[jarfile]".
   */
  @Override Iterable<String> getExtraCommandLineArgs() {
    String agentJar = options.get("allocationAgentJar");
    // TODO(schmoe): what can we do to verify that agentJar is correct? Or to get a nicer
    // error message when it's not?
    if (agentJar == null || !new File(agentJar).exists()) {
      throw new IllegalStateException("Can't find required allocationinstrumenter agent jar");
    }
    return Iterables.concat(super.getExtraCommandLineArgs(),
        ImmutableList.of("-javaagent:" + agentJar));
  }
}
