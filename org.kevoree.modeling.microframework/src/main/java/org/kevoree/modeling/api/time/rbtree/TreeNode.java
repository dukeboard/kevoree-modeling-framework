package org.kevoree.modeling.api.time.rbtree;

/**
 * Created by duke on 10/5/14.
 */
public class TreeNode {

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

    private TreeNode left;

    private TreeNode right;

    private TreeNode parent = null;

    public TreeNode(long key, State value, Color color, TreeNode left, TreeNode right) {
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

    public TreeNode grandparent() {
        if (parent != null) {
            return parent.parent;
        } else {
            return null;
        }
    }

    public TreeNode sibling() {
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

    public TreeNode uncle() {
        if (parent != null) {
            return parent.sibling();
        } else {
            return null;
        }
    }

    public TreeNode getLeft() {
        return left;
    }

    public void setLeft(TreeNode left) {
        this.left = left;
    }

    public TreeNode getRight() {
        return right;
    }

    public void setRight(TreeNode right) {
        this.right = right;
    }

    public TreeNode getParent() {
        return parent;
    }

    public void setParent(TreeNode parent) {
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

    public TreeNode next() {
        TreeNode p = this;
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

    public TreeNode previous() {
        TreeNode p = this;
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
