package org.kevoree.modeling.api.time.rbtree;

/**
 * Created by duke on 10/7/14.
 */
public class ReaderContext {

    private String payload;

    private int offset;

    public ReaderContext(int offset, String payload) {
        this.offset = offset;
        this.payload = payload;
    }

    public Node unserialize(boolean rightBranch) throws Exception {
        if (offset >= payload.length()) {
            return null;
        }
        StringBuilder tokenBuild = new StringBuilder();
        char ch = payload.charAt(offset);
        if (ch == '%') {
            if (rightBranch) {
                offset = offset + 1;
            }
            return null;
        }
        if (ch == '#') {
            offset = offset + 1;
            return null;
        }
        if (ch != '|') {
            throw new Exception("Error while loading BTree");
        }
        offset = offset + 1;
        ch = payload.charAt(offset);
        Color color = Color.BLACK;
        State state = State.EXISTS;
        switch (ch) {
            case Node.BLACK_DELETE:
                color = Color.BLACK;
                state = State.DELETED;
                break;
            case Node.BLACK_EXISTS:
                color = Color.BLACK;
                state = State.EXISTS;
                break;
            case Node.RED_DELETE:
                color = Color.RED;
                state = State.DELETED;
                break;
            case Node.RED_EXISTS:
                color = Color.RED;
                state = State.EXISTS;
                break;
        }
        offset = offset + 1;
        ch = payload.charAt(offset);
        while (offset + 1 < payload.length() && ch != '|' && ch != '#' && ch != '%') {
            tokenBuild.append(ch);
            offset = offset + 1;
            ch = payload.charAt(offset);
        }
        if (ch != '|' && ch != '#' && ch != '%') {
            tokenBuild.append(ch);
        }
        Node p = new Node(Long.parseLong(tokenBuild.toString()), state, color, null, null);
        Node left = unserialize(false);
        if (left != null) {
            left.parent = p;
        }
        Node right = unserialize(true);
        if (right != null) {
            right.parent = p;
        }
        p.left = left;
        p.right = right;
        return p;
    }


}
