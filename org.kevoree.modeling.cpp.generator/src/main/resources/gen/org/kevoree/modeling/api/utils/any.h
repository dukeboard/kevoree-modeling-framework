#ifndef ANY_H
#define ANY_H

#include <algorithm>
#include <typeinfo>


/*
 * Inspired by boost
 * http://www.boost.org/doc/libs/boost/any.hpp
 */

class any
{
public:
    any():
		_content(0)		/// Creates an empty any type.

    {
    }

    template <typename ValueType>
    any(const ValueType& value):
		_content(new Holder<ValueType>(value))
		/// Creates an any which stores the init parameter inside.
		///
		/// Example: 
		///     Any a(13); 
		///     Any a(string("12345"));
    {
    }

    any(const any& other):
		_content(other._content ? other._content->clone() : 0)
		/// Copy constructor, works with empty Anys and initialized Any values.
    {
    }

    ~any()
    {
        delete _content;
    }

    any& swap(any& rhs)
		/// Swaps the content of the two Anys.
    {
        std::swap(_content, rhs._content);
        return *this;
    }

    template <typename ValueType>
    any& operator = (const ValueType& rhs)
		/// Assignment operator for all types != Any.
		///
		/// Example: 
		///    Any a = 13; 
		///    Any a = string("12345");
    {
        any(rhs).swap(*this);
        return *this;
    }

    any& operator = (const any& rhs)
		/// Assignment operator for Any.
    {
        any(rhs).swap(*this);
        return *this;
    }

    bool empty() const
		/// returns true if the Any is empty
    {
        return !_content;
    }


    const std::type_info& type() const
		/// Returns the type information of the stored content.
		/// If the Any is empty typeid(void) is returned.
		/// It is suggested to always query an Any for its type info before trying to extract
		/// data via an AnyCast/RefAnyCast.
    {
        return _content ? _content->type() : typeid(void);
    }

private:
    class Placeholder
    {
    public:
        virtual ~Placeholder()
        {
        }

        virtual const std::type_info& type() const = 0;
        virtual Placeholder* clone() const = 0;
    };

    template <typename ValueType>
    class Holder: public Placeholder
    {
    public: 
        Holder(const ValueType& value):
			_held(value)
        {
        }

        virtual const std::type_info& type() const
        {
            return typeid(ValueType);
        }

        virtual Placeholder* clone() const
        {
            return new Holder(_held);
        }

        ValueType _held;
    };

private:
    template <typename ValueType>
    friend ValueType* AnyCast(any*);

    template <typename ValueType>
    friend ValueType* UnsafeAnyCast(any*);

    Placeholder* _content;
};




template <typename ValueType>
ValueType* AnyCast(any* operand)
	/// AnyCast operator used to extract the ValueType from an Any*. Will return a pointer
	/// to the stored value. 
	///
	/// Example Usage: 
	///     MyType* pTmp = AnyCast<MyType*>(pAny).
	/// Will return NULL if the cast fails, i.e. types don't match.
{
    return operand && operand->type() == typeid(ValueType)
                ? &static_cast<any::Holder<ValueType>*>(operand->_content)->_held
                : 0;
}


template <typename ValueType>
const ValueType* AnyCast(const any* operand)
	/// AnyCast operator used to extract a const ValueType pointer from an const Any*. Will return a const pointer
	/// to the stored value. 
	///
	/// Example Usage:
	///     const MyType* pTmp = AnyCast<MyType*>(pAny).
	/// Will return NULL if the cast fails, i.e. types don't match.
{
    return AnyCast<ValueType>(const_cast<any*>(operand));
}


template <typename ValueType>
ValueType AnyCast(const any& operand)
	/// AnyCast operator used to extract a copy of the ValueType from an const Any&.
	///
	/// Example Usage: 
	///     MyType tmp = AnyCast<MyType>(anAny).
	/// Will throw a BadCastException if the cast fails.
	/// Dont use an AnyCast in combination with references, i.e. MyType& tmp = ... or const MyType& = ...
	/// Some compilers will accept this code although a copy is returned. Use the RefAnyCast in
	/// these cases.
{
    ValueType* result = AnyCast<ValueType>(const_cast<any*>(&operand));
    //if (!result) throw "Failed to convert between const Any types";
    return *result;
}


template <typename ValueType>
ValueType AnyCast(any& operand)
	/// AnyCast operator used to extract a copy of the ValueType from an Any&.
	///
	/// Example Usage: 
	///     MyType tmp = AnyCast<MyType>(anAny).
	/// Will throw a BadCastException if the cast fails.
	/// Dont use an AnyCast in combination with references, i.e. MyType& tmp = ... or const MyType& tmp = ...
	/// Some compilers will accept this code although a copy is returned. Use the RefAnyCast in
	/// these cases.
{
    ValueType* result = AnyCast<ValueType>(&operand);
 //   if (!result) throw "Failed to convert between Any types";
    return *result;
}


template <typename ValueType>
const ValueType& RefAnyCast(const any & operand)
	/// AnyCast operator used to return a const reference to the internal data. 
	///
	/// Example Usage: 
	///     const MyType& tmp = RefAnyCast<MyType>(anAny);
{
    ValueType* result = AnyCast<ValueType>(const_cast<any*>(&operand));
   // if (!result) throw "RefAnyCast: Failed to convert between const Any types";
    return *result;
}


template <typename ValueType>
ValueType& RefAnyCast(any& operand)
	/// AnyCast operator used to return a reference to the internal data.
	///
	/// Example Usage: 
	///     MyType& tmp = RefAnyCast<MyType>(anAny);
{
    ValueType* result = AnyCast<ValueType>(&operand);
   // if (!result) throw "RefAnyCast: Failed to convert between Any types";
    return *result;
}


template <typename ValueType>
ValueType* UnsafeAnyCast(any* operand)
	/// The "unsafe" versions of AnyCast are not part of the
	/// public interface and may be removed at any time. They are
	/// required where we know what type is stored in the any and can't
	/// use typeid() comparison, e.g., when our types may travel across
	/// different shared libraries.
{
    return &static_cast<any::Holder<ValueType>*>(operand->_content)->_held;
}


template <typename ValueType>
const ValueType* UnsafeAnyCast(const any* operand)
	/// The "unsafe" versions of AnyCast are not part of the
	/// public interface and may be removed at any time. They are
	/// required where we know what type is stored in the any and can't
	/// use typeid() comparison, e.g., when our types may travel across
	/// different shared libraries.
{
    return AnyCast<ValueType>(const_cast<any*>(operand));
}





#endif
