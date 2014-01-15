package org.kevoree.modeling.kotlin.generator;

import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 27/08/13
 * Time: 14:59
 */
public class EDataTypes {

  public static HashMap<String, String> dataTypes = new HashMap<String, String>();
  static {
    dataTypes.put("EBigDecimal", "java.math.BigDecimal");
  dataTypes.put("EBigInteger", "java.math.BigInteger");
  dataTypes.put("EBoolean", "Boolean");
  dataTypes.put("EBooleanObject", "Boolean");
  dataTypes.put("EByte", "Byte");
  dataTypes.put("EByteArray", "ByteArray");
  dataTypes.put("EByteObject", "Byte");
  dataTypes.put("EChar", "Char");
  dataTypes.put("ECharacterObject", "Char");
  dataTypes.put("EDate", "Char");
  dataTypes.put("EDiagnosticChain", "Any");
  dataTypes.put("EDouble", "Double");
  dataTypes.put("EDoubleObject", "Double");
  dataTypes.put("EEList", "List");
  dataTypes.put("EEnumerator", "Enum");
  dataTypes.put("EFeatureMap", "Any");
  dataTypes.put("EFeatureMapEntry", "Any");
  dataTypes.put("EFloat", "Float");
  dataTypes.put("EFloatObject", "Float");
  dataTypes.put("EInt", "Int");
  dataTypes.put("EIntegerObject", "Int");
  dataTypes.put("EJavaClass", "Class");
  dataTypes.put("EJavaObject", "Any");
  dataTypes.put("ELong", "Long");
  dataTypes.put("ELongObject", "Long");
  dataTypes.put("EMap", "Map");
  dataTypes.put("EResource", "Any");
  dataTypes.put("EResourceSet", "Any");
  dataTypes.put("EShort", "Short");
  dataTypes.put("EShortObject", "Short");
  dataTypes.put("EString", "String");
  dataTypes.put("EStringToStringMapEntry", "Any");
  dataTypes.put("ETreeIterator", "Any");
  dataTypes.put("EInvocationTargetException", "Any");
  }
}
