package org.kevoree.modeling.api.time.rbtree;

/**
 * Created by duke on 10/5/14.
 */
public class LongTreeNode {

    public static final char BLACK_DELETE = '0';
    public static final char BLACK_EXISTS = '1';
    public static final char RED_DELETE = '2';
    public static final char RED_EXISTS = '3';

    protected long key;

    public long getKey(){
        return key;
    }

    protected State value;

    protected Color color;

    private LongTreeNode left;

    private LongTreeNode right;

    private LongTreeNode parent = null;

    public LongTreeNode(long key, State value, Color color, LongTreeNode left, LongTreeNode right) {
        this.key = key;
        this.value = value;
        this.color = color;
        this.left = left;
        this.right = right;

        if (left != null) {
            left.parent = this;
        }
        if (right != null) {
            right.parent = this;
        }
        this.parent = null;
    }

    public LongTreeNode grandparent() {
        if (parent != null) {
            return parent.parent;
        } else {
            return null;
        }
    }

    public LongTreeNode sibling() {
        if (parent == null) {
            return null;
        } else {
            if (this == parent.left) {
                return parent.right;
            } else {
                return parent.left;
            }
        }
    }

    public LongTreeNode uncle() {
        if (parent != null) {
            return parent.sibling();
        } else {
            return null;
        }
    }

    public LongTreeNode getLeft() {
        return left;
    }

    public void setLeft(LongTreeNode left) {
        this.left = left;
    }

    public LongTreeNode getRight() {
        return right;
    }

    public void setRight(LongTreeNode right) {
        this.right = right;
    }

    public LongTreeNode getParent() {
        return parent;
    }

    public void setParent(LongTreeNode parent) {
        this.parent = parent;
    }

    public void serialize(StringBuilder builder) {
        builder.append("|");
        if (value == State.DELETED) {
            if (color == Color.BLACK) {
                builder.append(BLACK_DELETE);
            } else {
                builder.append(RED_DELETE);
            }
        } else {
            if (color == Color.BLACK) {
                builder.append(BLACK_EXISTS);
            } else {
                builder.append(RED_EXISTS);
            }
        }
        builder.append(key);
        if (left == null && right == null) {
            builder.append("%");
        } else {
            if (left != null) {
                left.serialize(builder);
            } else {
                builder.append("#");
            }
            if (right != null) {
                right.serialize(builder);
            } else {
                builder.append("#");
            }
        }
    }

    /*
    unefficient for the moment
    fun serializeBinary(buffer: ByteBuffer) {
        buffer.put(0)
        buffer.putLong(domainKey)
        if(value == STATE.EXISTS){
            buffer.put(0)
        } else {
            buffer.put(1)
        }
        if(color == Color.RED){
            buffer.put(0)
        } else {
            buffer.put(1)
        }
        if (left != null) {
            left?.serializeBinary(buffer)
        } else {
            buffer.put(1)
        }
        if (right != null) {
            right?.serializeBinary(buffer)
        } else {
            buffer.put(1)
        }
    } */

    public LongTreeNode next() {
        LongTreeNode p = this;
        if (p.right != null) {
            p = p.right;
            while (p.left != null) {
                p = p.left;
            }
            return p;
        } else {
            if (p.parent != null) {
                if (p == p.parent.left) {
                    return p.parent;
                } else {
                    while (p.parent != null && p == p.parent.right) {
                        p = p.parent;
                    }
                    return p.parent;
                }
            } else {
                return null;
            }
        }
    }

    public LongTreeNode previous() {
        LongTreeNode p = this;
        if (p.left != null) {
            p = p.left;
            while (p.right != null) {
                p = p.right;
            }
            return p;
        } else {
            if (p.parent != null) {
                if (p == p.parent.right) {
                    return p.parent;
                } else {
                    while (p.parent != null && p == p.parent.left) {
                        p = p.parent;
                    }
                    return p.parent;
                }
            } else {
                return null;
            }
        }
    }


}
