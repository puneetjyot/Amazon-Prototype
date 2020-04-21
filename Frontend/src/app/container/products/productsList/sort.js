import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

class Sort extends React.Component {
  render() {
    const prop = this.props.product;
    return (
      <Row className='custom-sort'>
        <Col lg={6} md={6} sm={6} xs={12}>
          <p
            style={{
              margin: "10px 0 10px auto",
              fontWeight: "500",
              fontSize: "13px",
            }}
          >
            {prop.page}-{prop.limit} of over {prop.total} results from "
            <span style={{ color: "#D56625", fontWeight: "700" }}>
              paper towels
            </span>
            "
          </p>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Form.Group
            controlId='productFilter'
            style={{ width: "15%", margin: "10px 0 10px auto" }}
          >
            <Form.Control
              as='select'
              style={{
                padding: "0px",
                background: "#e7e9ec",
                borderColor: "#ADB1B8 #A2A6AC #8D9096",
                fontSize: "11px",
                height: "calc(0.5em + .75rem + 2px)",
              }}
            >
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
              <option>Rating: High to Low</option>
              <option>Rating: Low to High</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.allProducts,
});

export default connect(mapStateToProps)(Sort);