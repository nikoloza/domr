'use strict'

import { deepMerge, overwrite, isArray, deepClone } from '../utils'

export const cleanWithNode = proto => delete proto.node && proto

/**
 * Flattens deep level prototypes into an array
 */
export const flattenProtosAsArray = (proto, protos = []) => {
  protos.push(proto)
  if (proto.proto) flattenProtosAsArray(proto.proto, protos)
  return protos
}

/**
 * Merges array prototypes
 */
export const mergeProtosArray = arr => {
  return arr.reduce((a, c) => deepMerge(a, deepClone(c)), {})
}

/**
 * Flattens deep level prototypes into an flat object
 */
export const flattenPrototype = (proto) => {
  var flattenedArray = flattenProtosAsArray(proto)
  var flattenedObj = mergeProtosArray(flattenedArray)

  if (flattenedObj.proto) delete flattenedObj.proto

  return deepClone(flattenedObj)
}

/**
 * Applies multiple prototype level
 */
export const deepProto = (element, proto) => {
  // if proto presented as array
  if (isArray(proto)) proto = mergeProtosArray(proto)

  // flatten prototypal inheritances
  var flatten = flattenPrototype(proto)

  // merge with prototype
  return deepMerge(element, flatten)
  // return overwrite(element, flatten)
}

/**
 * Checks whether element has `proto` or is a part
 * of parent's `childProto` prototype
 */
export const applyPrototype = (element) => {
  var { parent, proto } = element

  /** Merge with `proto` */
  if (proto) {
    deepProto(element, proto)
  }

  /** Merge with parent's `childProto` */
  if (parent && parent.childProto) {
    deepProto(element, parent.childProto)
  }

  return element
}
