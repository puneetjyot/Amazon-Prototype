import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  InputGroup,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";
//import { UserType, Logout } from "../../actions";
import { logOut } from "./../../../action/UserAction/logoutAction";
import { getCategory } from "./../../../action/ProductAction/productCategory";
import { getAllProducts } from "../../../action/ProductAction/productAction";

class Topnav extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      category: "All",
      search: "",
      reDirect: "",
    };
  }

  handleLogout = () => {
    this.props.logOut({ loginFlag: false });
  };

  componentWillMount() {
    const data = {
      page: 1,
      orderOn: "",
      order: "",
      sellerEmailId: "",
      sellerName: "",
      productName: "",
      productCategory: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      maxRating: "",
    };
    this.props.getAllProducts(data);
  }

  componentDidMount() {
    this.props.getCategory();
  }

  onSearch = () => {
    let cat = "";
    if (this.state.category !== "All") cat = this.state.category;
    const data = {
      page: 1,
      orderOn: "",
      order: "",
      sellerEmailId: "",
      sellerName: "",
      productName: this.state.search,
      productCategory: cat,
      minPrice: "",
      maxPrice: "",
      minRating: "",
      maxRating: "",
    };
    this.props.getAllProducts(data);
    this.setState({
      reDirect: "redirect",
    });
  };

  render() {
    var xnav;
    let redirectVar = null;
    let Applications = null,
      eventsApp = null;
    if (this.state.reDirect === "redirect")
      redirectVar = <Redirect to='/productlist' />;
    let cat = this.props.category.map(({ _id, name }) => {
      return (
        <Dropdown.Item
          key={_id}
          value={name}
          onClick={(e) => {
            this.setState({
              category: name,
            });
          }}
        >
          {name}
        </Dropdown.Item>
      );
    });
    if (localStorage.getItem("loginFlag")) {
      if (localStorage.getItem("category") === "seller") {
        xnav = (
          <Navbar.Collapse id='basic-navbar-nav'>
            <Form inline style={{ width: 70 + "%" }}>
              <InputGroup style={{ width: 90 + "%" }}>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant='outline-secondary'
                  id='input-group-dropdown-1'
                  className='grey bradius025'
                  title={this.state.category}
                >
                  {cat}
                </DropdownButton>

                <FormControl
                  type='text'
                  placeholder='Search'
                  aria-label='Search'
                  aria-describedby='basic-addon2'
                  style={{ borderRadius: 0 + "px" }}
                  value={this.state.search}
                  onChange={(e) => {
                    this.setState({ search: e.target.value });
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant='outline-secondary'
                    className='sprite'
                    onClick={this.onSearch}
                  >
                    <FaSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <Nav>
              <Link
                to='/productlist'
                style={{ float: "left" }}
                className='custom-nav'
              >
                My
                <br />
                <b>Products</b>
              </Link>
              <NavDropdown
                title={
                  <div style={{ display: "inline-block" }}>
                    Hello Pranav
                    <br />
                    <span>
                      <b>Accounts &amp; List</b>
                    </span>
                  </div>
                }
                className='custom-nav'
                id='collasible-nav-dropdown'
                style={{ display: "Block", color: "#FFF" }}
              >
                <NavDropdown.Item>
                  <Link to='/seller/profile'>Profile</Link>
                </NavDropdown.Item>
                {Applications}
                {eventsApp}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to='/' onClick={this.handleLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        );
      } else {
        xnav = (
          <Navbar.Collapse id='basic-navbar-nav'>
            <Form inline style={{ width: 70 + "%" }}>
              <InputGroup style={{ width: 90 + "%" }}>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant='outline-secondary'
                  id='input-group-dropdown-1'
                  className='grey bradius025'
                  title={this.state.category}
                >
                  {cat}
                </DropdownButton>

                <FormControl
                  type='text'
                  placeholder='Search'
                  aria-label='Search'
                  aria-describedby='basic-addon2'
                  style={{ borderRadius: 0 + "px" }}
                  value={this.state.search}
                  onChange={(e) => {
                    this.setState({ search: e.target.value });
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant='outline-secondary'
                    className='sprite'
                    onClick={this.onSearch}
                  >
                    <FaSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <Nav>
              <Link
                to='/productlist'
                style={{ float: "left" }}
                className='custom-nav'
              >
                All
                <br />
                <b>Products</b>
              </Link>
              <Link
                to='/customer/orders'
                style={{ float: "left" }}
                className='custom-nav'
              >
                My
                <br />
                <b>Order</b>
              </Link>
              <NavDropdown
                className='custom-nav'
                title={
                  <div style={{ display: "inline-block", color: "#FFF" }}>
                    Hello Pranav
                    <br />
                    <span>
                      <b>Accounts &amp; List</b>
                    </span>
                  </div>
                }
                id='collasible-nav-dropdown'
              >
                <NavDropdown.Item>
                  <Link to='/customer/profile'>Profile</Link>
                </NavDropdown.Item>
                {Applications}
                {eventsApp}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to='/' onClick={this.handleLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Link
                to='/cart'
                style={{ position: "relative", whiteSpace: "nowrap" }}
                className='custom-nav'
              >
                <span id='num-item'>0</span>
                <div className='cart'></div>
                <span id='span-cart'>Cart</span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        );
      }
    } else {
      xnav = (
        <Navbar.Collapse id='basic-navbar-nav'>
          <Form inline className='mr-auto'>
            <FormControl
              type='text'
              placeholder='Search'
              className='mr-sm-3'
              style={{ display: "none" }}
            />
          </Form>
          <Nav activeKey='/login'>
            <Link to='/login' className='custom-nav'>
              Login
            </Link>
            <Link to='/registerCustomer' className='custom-nav'>
              Create Account
            </Link>
          </Nav>
        </Navbar.Collapse>
      );
    }
    return (
      <div className='container-fluid bluebeacon'>
        {redirectVar}
        <div>
          <Navbar expand='lg'>
            <Navbar.Brand style={{ marginRight: 70 + "px" }}>
              <img src='/logo.png' height='40' alt='amazon-logo' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            {xnav}
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  console.log("In navbar");
  return {
    getProfileInfo: state.getProfileInfo,
    getType: state.getType,
    getCompProfile: state.getCompProfile,
    category: state.categoryReducer.category,
    productSearch: state.productSearch,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (payload) => dispatch(logOut(payload)),
    getCategory: () => dispatch(getCategory()),
    getAllProducts: (payload) => dispatch(getAllProducts(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Topnav);
