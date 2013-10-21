
#include "trace/ModelTrace.h"
#include "trace/DefaultTraceConverter.h"


int main(int argc,char **argv){


ModelAddTrace *t = new ModelAddTrace("","","","");
DefaultTraceConverter *defaultTraceConvert = new DefaultTraceConverter();


ModelTrace *t2 = defaultTraceConvert->convert(t);




}
