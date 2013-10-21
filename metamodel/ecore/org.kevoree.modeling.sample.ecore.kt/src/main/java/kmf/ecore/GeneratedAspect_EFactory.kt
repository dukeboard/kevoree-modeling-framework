package kmf.ecore;
import org.kevoree.modeling.api.aspect;
public aspect trait GeneratedAspect_EFactory : kmf.ecore.EFactory {
	override fun getEAnnotation(_source:String) : kmf.ecore.EAnnotation? {
		throw Exception("Not implemented yet !");
	}
	override fun create(_eClass:kmf.ecore.EClass) : kmf.ecore.EObject? {
		throw Exception("Not implemented yet !");
	}
	override fun convertToString(_eDataType:kmf.ecore.EDataType,_instanceValue:Any) : String {
		throw Exception("Not implemented yet !");
	}
	override fun createFromString(_eDataType:kmf.ecore.EDataType,_literalValue:String) : Any {
		throw Exception("Not implemented yet !");
	}
}
