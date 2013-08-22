package ;
import org.kevoree.modeling.api.aspect;
public aspect trait GeneratedAspect_RedefinableElement : uml.RedefinableElement {
	override fun redefinition_context_valid(diagnostics:Any,context:Any) : Boolean {
		throw Exception("Not implemented yet !");
	}
	override fun redefinition_consistent(diagnostics:Any,context:Any) : Boolean {
		throw Exception("Not implemented yet !");
	}
	override fun isConsistentWith(redefinee:Any) : Boolean {
		throw Exception("Not implemented yet !");
	}
	override fun isRedefinitionContextValid(redefined:Any) : Boolean {
		throw Exception("Not implemented yet !");
	}
}
