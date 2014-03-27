package kmf

type ModelEvent struct {
	sourcePath string;
	actionType ActionType;
	elementAttributeType ElementAttributeType
	elementAttributeName string;
	value *;
	previousValue *
}

func (me ModelEvent) String() string {
	return "ModelEvent[src:" + me.sourcePath + ", type:" + me.actionType + ", elementAttributeType:" + me.elementAttributeType + ", elementAttributeName:" + me.elementAttributeName + ", value:" + me.value + "]"
}

type ModelElementListener interface {
	elementChanged(evt ModelEvent)
}


