package org.kevoree.loader

class LoadingContext() {

		var loadedRoots : java.util.ArrayList<Any> = java.util.ArrayList<Any>()

		val map : java.util.HashMap<String, Any> = java.util.HashMap<String, Any>()

		val elementsCount : java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()

		val resolvers : MutableList<() -> Unit> = java.util.ArrayList<() -> Unit>()

		val stats : java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()

}
