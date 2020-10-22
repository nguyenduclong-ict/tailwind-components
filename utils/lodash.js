import mergeWith from 'lodash/mergeWith'
import get from 'lodash/get'
import unset from 'lodash/unset'
import set from 'lodash/set'
import defaultsDeep from 'lodash/defaultsDeep'
import debounce from 'lodash/debounce'
import pick from 'lodash/pick'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import uniqWith from 'lodash/uniqWith'
import merge from 'lodash/merge'
import omitBy from 'lodash/omitBy'
import has from 'lodash/has'
import forEach from 'lodash/forEach'
import remove from 'lodash/remove'

export {
  forEach,
  mergeWith,
  get,
  set,
  defaultsDeep,
  debounce,
  pick,
  cloneDeep,
  isEqual,
  uniq,
  uniqBy,
  uniqWith,
  merge,
  omitBy,
  unset,
  has,
  remove,
}

function customDefaultsMerge(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

export function defaultsDeepWith(
  source,
  customizer = customDefaultsMerge,
  ...args
) {
  args.push(undefined, source, customizer)
  return mergeWith.apply(undefined, args)
}

export function customGet(source, path, defaultData) {
  if (path) {
    return get(source, path, defaultData)
  }
  return source
}

// Create function compare 2 object
export function compare(keys) {
  if (!keys) {
    return isEqual
  } else {
    keys = Array.isArray(keys) ? keys : [keys]
    return function (a, b) {
      return isEqual(pick(a, keys), pick(b, keys))
    }
  }
}

// Replace item in array
export function replaceItem(array, data, _compare) {
  _compare = _compare || ((v) => isEqual(data, v))
  array.forEach((item, index) => {
    if (_compare(item)) {
      array.splice(index, 1, item)
    }
  })
}

export function removeItem(array, item, _compare) {
  _compare = _compare || ((v) => isEqual(item, v))
  let index = array.findIndex(_compare)
  while (index >= 0) {
    array.splice(index, 1)
    index = array.findIndex(_compare)
  }
}
