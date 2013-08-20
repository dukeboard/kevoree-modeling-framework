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
package com.google.caliper.memory;

/**
 * A visitor that controls an object traversal. Implementations
 * of this interface are passed to {@link com.google.caliper.memory.ObjectExplorer} exploration methods.
 *
 * @param <T> the type of the result that this visitor returns
 * (can be defined as {@code Void} to denote no result}.
 * 
 * @see com.google.caliper.memory.ObjectExplorer
 */
public interface ObjectVisitor<T> {
  /**
   * Visits an explored value (the whole chain from the root object
   * leading to the value is provided), and decides whether to continue
   * the exploration of that value.
   *
   * <p>In case the explored value is either primitive or {@code null}
   * (e.g., if {@code chain.isPrimitive() || chain.getValue() == null}),
   * the return value is meaningless and is ignored. 
   *
   * @param chain the chain that leads to the explored value.
   * @return {@link com.google.caliper.memory.ObjectVisitor.Traversal#EXPLORE} to denote that the visited object
   * should be further explored, or {@link com.google.caliper.memory.ObjectVisitor.Traversal#SKIP} to avoid
   * exploring it.
   */
  Traversal visit(Chain chain);

  /**
   * Returns an arbitrary value (presumably constructed during the object
   * graph traversal).
   */
  T result();

  /**
   * Constants that denote how the traversal of a given object (chain)
   * should continue.
   */
  enum Traversal {
    /**
     * The visited object should be further explored.
     */
    EXPLORE,

    /**
     * The visited object should not be explored.
     */
    SKIP
  }
}
