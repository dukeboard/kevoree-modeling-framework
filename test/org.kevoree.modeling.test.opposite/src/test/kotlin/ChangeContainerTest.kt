
/*
import org.junit.Test
import org.kevoree.modeling.api.persistence.MemoryDataStore
import kotlin.test.assertNotNull
import kmf.test.B
import kmf.test.A
import kmf.test.C
import kmf.test.Container
import kotlin.test.assertNull

class ChangeContainerTest {

    val factory = kmf.factory.DefaultKmfFactory()

    Test fun changeContainerTest() {
        var container = factory.createContainer()
        var b = factory.createB()
        container.addBees(b)
        var c = factory.createC()
        container.addCees(c)
        var a = factory.createA()
        b.addPlusList(a)

        //INITIAL CHECK
        val aBefore = a.path()
        assert(b.eContainer() == container, "B container is: " + b.eContainer())
        assert(a.eContainer() == b, "A container is: " + a.eContainer())

       //MOVE
        c.addBees(b)
        val aAfter = a.path()
        assert(!aBefore.equals(aAfter), "ABefore:" + aBefore + "     ->     AAfter:" + aAfter)
        assert(b.eContainer() == c, "B container is: " + b.eContainer())
        assert(a.eContainer() == b, "A container is: " + a.eContainer())

    }

}
*/