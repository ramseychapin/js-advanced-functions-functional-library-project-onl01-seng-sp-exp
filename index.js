  const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          let a = collection[i]
          callback(a, i, collection)
        }
      } else {
        let keys = Object.keys(collection)
        for (let i = 0; i < keys.length; i++) {
          let k = keys[i]
          let v = collection[k]
          callback(v, k, collection)
        }
      }
      return collection
    },

    map: function(collection, callback) {
      let newCollection = []
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          let value = collection[i]
          newCollection.push(callback(value, i, collection))
        }
      } else {
        let keys = Object.keys(collection)
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i]
          let value = collection[key]
          newCollection.push(callback(value, key, collection))
        }
      }
      return newCollection
    },

    reduce: function(collection, callback, acc) {
      let newAcc

      if (!acc){
        newAcc = collection[0]
        collection = collection.slice(1)
      } else {
        newAcc = acc
      }

      for (let i = 0; i < collection.length; i++) {
        newAcc = callback(newAcc, collection[i], collection)
      }
      return newAcc
    },

    find: function(collection, predicate) {
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          return collection[i]
          break
        }
      }
    },

    filter: function(collection, predicate) {
      let newCollection = []
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          newCollection.push(collection[i])
        }
      }
      return newCollection
    },

    size: function(collection) {
      let count = 0

      if (Array.isArray(collection))
      for (let i = 0; i < collection.length; i++) {
        if (collection[i]) {
          count++
        }
      } else {
        let keys = Object.keys(collection)
        for (let i = 0; i < keys.length; i++) {
          if (keys[i]) {
            count++
          }
        }
      }
      return count
    },

    first: function(collection, n) {
      return n ? collection.slice(0, n) : collection[0]
      
    },

    last: function(collection, n) {
      return n ? collection.slice(collection.length - n, collection.length) : collection[collection.length - 1]
    },

    compact: function(collection) {
      let newCollection = []
      for (let i = 0; i < collection.length; i++) {
        if (collection[i]) newCollection.push(collection[i])
      }
      return newCollection
    },

    sortBy: function(collection, callback) {
      const newArr = [...collection]
      return newArr.sort(function(a,b) {
        return callback(a) - callback(b)
      })
    },

    flatten: function(collection, shallow) {
       let holder = []
      let level = -1
      function isItAnArray(e){
        if (Array.isArray(e)){
          level += 1
          if (shallow && level >= 2){
            holder.push(e)
            return
          }
          return fi.each(e, isItAnArray);
        } else{
          level -= 1
          holder.push(e)
        }
      }

      isItAnArray(collection)

      return holder
    },

    uniqSorted: function (collection, callback) {
      
      const newArr = [collection[0]]
      for (let i = 1; i < collection.length; i++) {
        if (collection[i-1] !== collection[i]) {
          newArr.push(collection[i])
        }
      }
      return newArr 
      // if (!callback) {
      
      // } else {
      //   const callbackArr = []
      //   for (let i = 0; i < collection.length; i++) {
      //     callbackArr.push(callback(collection[i]))
      //   }
        
      //   const newArr = [collection[0]]
      //   for (let i = 1; i < callbackArr.length; i++) {
      //     if (callbackArr[i-1] !== callbackArr[i]) {
      //       newArr.push(collection[i])
      //     }
      //   }
      //   return newArr  
      },


    uniq: function(collection, isSorted, callback) {
      if (isSorted) {
        return fi.uniqSorted(collection, callback);
      } else if (!callback) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set();
        const uniqVals = new Set();
        for (let val of collection) {
          const moddedVal = callback(val);
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal);
            uniqVals.add(val);
          }
        }
        return Array.from(uniqVals);
      }
    },

    keys: function(object) {
      const keyNames = []
      const getKeys = Object.keys(object)
      for (let i = 0; i < getKeys.length; i++) {
          keyNames.push(getKeys[i])
        }
      return keyNames

    },

    values: function(object) {
      const valueNames = []
      const getKeys = Object.keys(object)
      for (let i = 0; i < getKeys.length; i++) {
          valueNames.push(object[getKeys[i]])
        }
      return valueNames
    },

    functions: function(object) {
      const functionNames = []
      const getKeys = Object.keys(object)
      for (let i = 0; i < getKeys.length; i++) {
        if (typeof object[getKeys[i]] === 'function') {
          functionNames.push(object[getKeys[i]])
        }
      }
      return functionNames
    },
  }
})()

fi.libraryMethod()
