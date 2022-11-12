import {createDraftSafeSelector} from "@reduxjs/toolkit";


const selectSchemes = state => state.schemes

export const selectDbmlValue = createDraftSafeSelector(selectSchemes, schemes => schemes.dbmlScheme)

const getIsError = obj => obj.isError
const getValue = (obj, isError) => {
  if (isError) {
    return obj.errorMessage
  }
  return obj.data
}

export const selectJsonSchemeObj = createDraftSafeSelector(selectSchemes, scheme => scheme.jsonScheme)
export const selectIsErrorJSONConversion = createDraftSafeSelector(selectJsonSchemeObj, getIsError)
export const selectJSONValue = createDraftSafeSelector(selectJsonSchemeObj, selectIsErrorJSONConversion, getValue)

export const selectMDSchemeObj = createDraftSafeSelector(selectSchemes, scheme => scheme.mdscheme)
export const selectIsErrorMDNConversion = createDraftSafeSelector(selectMDSchemeObj, getIsError)
export const selectMDValue = createDraftSafeSelector(selectMDSchemeObj, selectIsErrorMDNConversion, getValue)

export const selectJsonObj = createDraftSafeSelector(selectSchemes, scheme => scheme.jsonObj)
export const selectTableData = createDraftSafeSelector(selectJsonObj, jsonObj => {
  if (jsonObj.isError) return null
  if (!jsonObj.data?.schemas) return null

  return jsonObj.data.schemas.map(ts => ts.tables).flat()
})

export const selectTableDataConvertedToJSON = createDraftSafeSelector(selectTableData, tables => {
  if (!tables) return ''

  return JSON.stringify(tables, undefined, 2)
})

export const selectTopLevelTablesData = createDraftSafeSelector(selectTableData, tables => {
  if (!tables) return ''

  const topLevelTables = tables.map(table => {
    return {
      name: table.name,
      alias: table?.alias ? table?.alias : '',
      note: table?.note ? table?.note : '',
    }
  })

  return {tables: topLevelTables}
})

export const selectTopLevelTablesDataConvertedToJSON = createDraftSafeSelector(selectTopLevelTablesData, tables => {
  if (!tables) return ''
  return JSON.stringify(tables, undefined, 2)
})

export const selectTopLevelTablesDataConvertedToJSONForMD = createDraftSafeSelector(selectTopLevelTablesData, tablesObj => {
  if (!tablesObj) return ''
  return JSON.stringify(tablesObj.tables, undefined, 2)
})

