import { fetch, fetchImg, postFetch } from "./baseApi";

//POST / api / SchoolEquipment / SchoolEquipmentList
//学校设备列表
export function SchoolEquipmentList(params = {}) {
  return fetch("POST", params, "SchoolEquipmentList", false, false, "SchoolEquipment/").then(res => {
    return res.data;
  });
}



//设备类型列表
export function GetEquipmentTypeList(params = {}) {
  return fetch("POST", params, "GetEquipmentTypeList", false, false, "SchoolEquipment/").then(res => {
    return res.data;
  });
}

//设备型号列表
export function GetUnitTypeList(params = {}) {
  return fetch("POST", params, "GetUnitTypeList", false, false, "SchoolEquipment/").then(res => {
    return res.data;
  });
}

//设备添加
export function AddSchoolEquipment(params = {}) {
  return fetch("POST", params, "AddSchoolEquipment", false, false, "SchoolEquipment/").then(res => {
    return res.data;
  });
}


//设备预警
export function RepairsEquipmentList(params = {}) {
  return fetch("POST", params, "RepairsEquipmentList", false, false, "Repairs/").then(res => {
    return res.data;
  });
}



//设备详情
export function GetSchoolEquipment(params = {}) {
  return fetch("POST", params, "GetSchoolEquipment", false, false, "SchoolEquipment/").then(res => {
    return res.data;
  });
}

//设备更新
export function UpdateSchoolEquipment(params = {}) {
  return fetch("POST", params, "UpdateSchoolEquipment", false, false, "SchoolEquipment/").then(res => {
    return res.data;
  });
}


//获取报修编号
export function GetRepairsNum(params = {}) {
  return fetch("POST", params, "GetRepairsNum", false, false, "Repairs/").then(res => {
    return res.data;
  });
}

//设备维修列表
export function MaintainEquipmentList(params = {}) {
  return fetch("POST", params, "MaintainEquipmentList", false, false, "Repairs/").then(res => {
    return res.data;
  });
}
//设备维修人列表
export function MaintainPersonList(params = {}) {
  return fetch("POST", params, "MaintainPersonList", false, false, "Repairs/").then(res => {
    return res.data;
  });
}

//报修设备
export function RepairsEquipment(params = {}) {
  return fetch("POST", params, "RepairsEquipment", false, false, "Repairs/").then(res => {
    return res.data;
  });
}


//设备维修详情
export function MaintainEquipmentInfo(params = {}) {
  return fetch("POST", params, "MaintainEquipmentInfo", false, false, "Repairs/").then(res => {
    return res.data;
  });
}


//设备维修接单
export function EquipmentTakeOrders(params = {}) {
  return fetch("POST", params, "EquipmentTakeOrders", false, false, "Repairs/").then(res => {
    return res.data;
  });
}


//设备维修录入
export function MaintainEquipmentSolution(params = {}) {
  return fetch("POST", params, "MaintainEquipmentSolution", false, false, "Repairs/").then(res => {
    return res.data;
  });
}

//问题手册
export function GetEquipmentHelpDoc(params = {}) {
  return fetch("POST", params, "GetEquipmentHelpDoc", false, false, "SchoolEquipment/").then(res => {
    return res.data;
  });
}