package org.kevoree.modeling.api.util

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 19:15
 */

enum class ActionType(val code: String) {
    SET : ActionType("S")
    ADD : ActionType("a")
    REMOVE : ActionType("r")
    ADD_ALL : ActionType("A")
    REMOVE_ALL : ActionType("R")
    RENEW_INDEX : ActionType("I")
    CONTROL : ActionType("C")
}