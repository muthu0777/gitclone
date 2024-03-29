"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Picker
} from "react-native";
import { connect } from "react-redux";
import { Text } from "react-native-elements";
import { getAllProducts, pickProduct, pickType } from "../store/products";
import {
  getAllFavorites,
  storeFavorite,
  removeFavorite
} from "../store/favorites";
import ProductList from "./ProductList";

export class AllProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      category: "all"
    };
  }

  componentDidMount() {
    this.props.getProducts();
    this.props.getFavorites().then(faves => {
      this.setState({ favorites: faves });
    });
  }

  handlePress = event => {
    this.props.addPickedItem(event);
    this.props.visibilityChange();
    this.props.searchingPlaneIcon()
  };

  handleFilter(itemValue) {
    this.setState({ category: itemValue });
    this.props.filterProducts(itemValue);
  }

  render() {
    const filter =
      this.state.category === "all"
        ? this.props.products
        : this.props.filteredProducts;

    return (
      <View style={styles.listContainer}>
        <Text h3 style={styles.header}>
          Choose Products
        </Text>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(itemValue, itemIndex) => this.handleFilter(itemValue)}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Chairs" value="chair" />
          <Picker.Item label="Couches" value="couch" />
          <Picker.Item label="Shelves" value="shelf" />
          <Picker.Item label="Tables" value="table" />
        </Picker>

        <ProductList
          data={filter}
          category={this.state.category}
          handlePress={event => this.handlePress(event)}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  AllProductPage: {
    fontFamily: "Didot",
    fontSize: 30,
    color: "#444B50",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 5
  },

  header: {
    textAlign: "center",
    color: "#394730",
    fontFamily: "Didot-Bold"
  },

  listContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    fontFamily: "Didot",
    fontSize: 50,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center",
    margin: 20
  },

  imageContainer: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  products: state.products.products,
  favorites: state.favorites.favorites,
  filteredProducts: state.products.filteredProducts
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getAllProducts()),
  addPickedItem: item => dispatch(pickProduct(item)),
  getFavorites: () => dispatch(getAllFavorites()),
  addFavorite: item => dispatch(storeFavorite(item)),
  removeFavorite: index => dispatch(removeFavorite(index)),
  filterProducts: type => dispatch(pickType(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProductPage);
