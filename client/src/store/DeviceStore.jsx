import { makeAutoObservable } from 'mobx';

export class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._rating = 0;
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 2;
    this._searchInput = '';
    this._filteredDevices = [];
    this._useFilteredDevices = false;
    makeAutoObservable(this);
  }

  setRating(rating) {
    this._rating = rating;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  setSearchInput(searchInput) {
    this._searchInput = searchInput;
  }

  setFilteredDevices(filteredDevices) {
    this._filteredDevices = filteredDevices;
  }

  setUseFilteredDevices(useFilteredDevices) {
    this._useFilteredDevices = useFilteredDevices;
  }

  get rating() {
    return this._rating;
  }

  get page() {
    return this._page;
  }

  get totalCount() {
    return this._totalCount;
  }

  get limit() {
    return this._limit;
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get devices() {
    return this._useFilteredDevices ? this._filteredDevices : this._devices;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get searchInput() {
    return this._searchInput;
  }

  get filteredDevices() {
    return this._filteredDevices;
  }

  get useFilteredDevices() {
    return this._useFilteredDevices;
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }

  deleteBrand(id) {
    this._brands = this._brands.filter((brand) => brand.id !== id);
  }

  deleteType(id) {
    this._types = this._types.filter((type) => type.id !== id);
  }
}
