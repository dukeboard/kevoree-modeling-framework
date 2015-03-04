package org.kevoree.modeling.api;

/**
 * Created by duke on 04/03/15.
 */
public class KConfig {

    public static final int TREE_CACHE_SIZE = 3;

    public static final int CALLBACK_HISTORY = 1000;

    // Limit long lengths to 53 bits because of JS limitation
    public static final long BEGINNING_OF_TIME = -0x001FFFFFFFFFFFFEl;

    public static final long END_OF_TIME = 0x001FFFFFFFFFFFFEl;

    public static final long NULL_LONG = 0x001FFFFFFFFFFFFFl;

    // Limit limit local index to LONG limit - prefix size
    public static final long KEY_PREFIX_SIZE = 0x0000001FFFFFFFFFl;

}
