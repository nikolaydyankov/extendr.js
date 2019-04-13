export default function extendr() {
	var options; var name; var src; var copy; var copyIsArray; var clone
	var target = arguments[0] || {}
	var i = 1
	var length = arguments.length
	var deep = false

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target
		target = arguments[1] || {}
		// skip the boolean and the target
		i = 2
	}

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== 'object' && !isFunction(target)) {
		target = {}
	}

	for (; i < length; i++) {
		// Only deal with non-null/undefined values
		if ((options = arguments[ i ]) != null) {
			// Extend the base object
			for (name in options) {
				src = target[ name ]
				copy = options[ name ]

				// Prevent never-ending loop
				if (target === copy) {
					continue
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false
						clone = src && isArray(src) ? src : []
					} else {
						clone = src && isPlainObject(src) ? src : {}
					}

					// Never move original objects, clone them
					target[ name ] = extend(deep, clone, copy)

				// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[ name ] = copy
				}
			}
		}
	}

	// Return the modified object
	return target
};

function isArray(a) {
	if (a === null || a === undefined) return false
	if (Object.prototype.toString.call(a) === '[object Array]') return true

	return false
}
function isPlainObject(a) {
	if (a === null || a === undefined) return false
	if (Object.prototype.toString.call(a) === '[object Object]') return true

	return false
}
function isFunction(a) {
	if (a === null || a === undefined) return false
	if (Object.prototype.toString.call(a) === '[object Function]') return true

	return false
}