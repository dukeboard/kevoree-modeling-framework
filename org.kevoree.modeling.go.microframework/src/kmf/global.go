package kmf

type ActionType int

const (
	SET ActionType = iota
	ADD
	REMOVE
	ADD_ALL
	REMOVE_ALL
	RENEW_INDEX
)

type ElementAttributeType int

const(
	ATTRIBUTE ElementAttributeType  = iota
	REFERENCE
	CONTAINMENT
)
