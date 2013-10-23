#ifndef ANY_H
#define ANY_H

template<class T> class tpl
{
    T content;
public:
    tpl(const T& value) : content(value) {}
    operator T() const
    {
        return content;
    }
};

/*
 * http://www.boost.org/doc/libs/1_54_0/boost/any.hpp
 */
class any
{
public:

    any() : content(0) {}

    any(const any& other) : content(other.content -> clone()) {}

    template<class T> any(const T& value) : content(new holder<T>(value))
    {
    }

    ~any() 
    {
        delete content;
    }

    class placeholder
    {
    public:
        placeholder() {}
        virtual placeholder* clone() const = 0;
    };

    template<class T> class holder : public placeholder
    {
    public:
        T content;

        holder(const T& value) : content(value) {}
        ~holder() {}

        placeholder* clone() const
        {
            return new holder<T>(content);
        }
    };

    template<class T> operator T () const
    {
        return dynamic_cast<holder<T>*>(content)->content;
    }

    placeholder* content;
};

#endif
