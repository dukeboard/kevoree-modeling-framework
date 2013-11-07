package ecore;
import org.kevoree.modeling.api.aspect;
public aspect trait GeneratedAspect_EFactory : ecore.EFactory {
	override fun createFromString(_eDataType:ecore.EDataType,_literalValue:String) : Any {
		throw Exception("Not implemented yet !");
	}
	override fun getEAnnotation(_source:String) : ecore.EAnnotation? {
		throw Exception("Not implemented yet !");
	}
	override fun create(_eClass:ecore.EClass) : ecore.EObject? {
		throw Exception("Not implemented yet !");
	}
	override fun convertToString(_eDataType:ecore.EDataType,_instanceValue:Any) : String {
		throw Exception("Not implemented yet !");
	}
}
