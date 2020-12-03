import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactDOM from "react-dom";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import RadioGroup from "@material-ui/core/RadioGroup";

import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardAvatar from "../components/Card/CardAvatar.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import GridItem from "../components/Grid/GridItem.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import Button from "../components/CustomButtons/Button.jsx";
import Switch from "@material-ui/core/Switch";

import avatar from "../assets/marc.jpg";

import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const connectorList = {
  width: "266px",
  top: "30px"
};

const switchValue = {
  marginTop: "30px"
};

class ConnectorForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      data: {
        isLoaded: false,
        connectorId: "",
        connectorName: "",
        metadata: [],
        datasource_configs_attributes: [
          { connector_metadata_id: "", value: "" }
        ],
        type: "source",
        connector: "",
        datasourceName: "",
        items: []
      }
    };
  }

  componentDidMount() {
    fetch("http://192.168.1.198:3002/api/v1/connectors")
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: {
            isLoaded: true,
            connectorId: "",
            connectorName: "",
            metadata: [],
            datasource_configs_attributes: [
              { connector_metadata_id: "", value: "" }
            ],
            type: "source",
            connector: "",
            datasourceName: "",
            items: json.connectors
          }
        });
      });
  }

  handleBoolean = (idx, id, event) => {
    let data = { ...this.state.data };
    data.datasource_configs_attributes[idx] = {
      connector_metadata_id: id,
      value: event.target.checked
    };

    this.setState({ data });
  };

  handleConnectorChange = (field, event) => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
    this.getMetadata(event.target.value);
  };

  handleChange = (field, event) => {
    let data = { ...this.state.data };
    data[field] = event.target.value;
    this.setState({ data });
  };

  getMetadata = connecor_id => {
    fetch("http://192.168.1.198:3002/api/v1/connectors/" + connecor_id)
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: {
            isLoaded: true,
            connectorId: json.connector.id,
            connectorName: json.connector.name,
            metadata: json.connector.connector_metadatas,
            datasource_configs_attributes: [
              { connector_metadata_id: "", value: "" }
            ],
            type: "source",
            connector: this.state.data.connectorName,
            datasourceName: "",
            items: this.state.data.items
          }
        });
      });
  };

  handleMetadata = (idx, id, event) => {
    let data = { ...this.state.data };
    data.datasource_configs_attributes[idx] = {
      connector_metadata_id: id,
      value: event.target.value
    };

    this.setState({ data });
  };

  onSubmit(e) {
    e.preventDefault();
    var requestBody = this.state.data;

    fetch("http://192.168.1.198:3002/api/v1/datasources/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        datasource: {
          name: requestBody.datasourceName,
          user_id: 1,
          project_id: 1,
          connector_id: requestBody.connectorId,
          datasource_configs_attributes:
            requestBody.datasource_configs_attributes
        }
      })
    });
  }

  render() {
    const { classes } = this.props;
    var {
      isLoaded,
      connector_id,
      connect_name,
      metadata,
      type,
      connector,
      name,
      items
    } = this.state.data;

    return (
      <form
        className={classes.container}
        autoComplete="off"
        onSubmit={this.onSubmit}
      >
        <div className="form-content">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <h1> DataSource </h1>
                <CardBody>
                  <GridContainer>
                    <div className="d-inline-flex col-12">
                      <div className="col-6">
                        <FormControl
                          component="fieldset"
                          className={classes.formControl}
                        >
                          <RadioGroup
                            aria-label="Type"
                            name="type"
                            className={classes.group}
                            value={this.state.data.type}
                            onChange={e => this.handleChange("type", e)}
                            style={{ display: "block" }}
                          >
                            <FormControlLabel
                              value="source"
                              control={<Radio color="primary" />}
                              label="Source"
                            />
                            <FormControlLabel
                              value="sink"
                              control={<Radio color="primary" />}
                              label="Sink"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div className="col-6">
                        <FormControl className={classes.formControl}>
                          <InputLabel
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                            htmlFor="connector"
                          >
                            Connector
                          </InputLabel>
                          <Select
                            value={this.state.data.connectorId}
                            onChange={e =>
                              this.handleConnectorChange("connector", e)
                            }
                            className="connectorList"
                            style={{ width: "266px" }}
                            inputProps={{
                              name: "connector",
                              id: "connector"
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {items.map(i => (
                              <MenuItem key={i.id} value={i.id}>
                                {i.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        id="name"
                        label="Name"
                        className={classes.textField}
                        value={this.state.data.datasourceName}
                        onChange={e => this.handleChange("datasourceName", e)}
                        margin="normal"
                      />
                    </GridItem>
                    {metadata.map((item, idx) => (
                      <GridItem xs={12} sm={12} md={4} key={item.id}>
                        {(() => {
                          if (item.display_type == "string") {
                            return (
                              <TextField
                                key={item.ckey}
                                id={item.ckey}
                                label={item.display_name}
                                className={classes.textField}
                                onChange={e =>
                                  this.handleMetadata(idx, item.id, e)
                                }
                                margin="normal"
                              />
                            );
                          } else if (item.display_type == "list") {
                            return (
                              <Select
                                label={item.ckey}
                                key={item.ckey}
                                value={
                                  this.state.data.datasource_configs_attributes[
                                    idx
                                  ]
                                    ? this.state.data
                                        .datasource_configs_attributes[idx]
                                        .value
                                    : item.default_value
                                }
                                onChange={e =>
                                  this.handleMetadata(idx, item.id, e)
                                }
                                className="connectorList"
                                style={connectorList}
                                name={item.ckey}
                                id={item.ckey}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {item.allowed_values ? (
                                  item.allowed_values
                                    .replace(/\[|\]|"/g, "")
                                    .split(",")
                                    .map(i => (
                                      <MenuItem key={i} value={i}>
                                        {i}
                                      </MenuItem>
                                    ))
                                ) : (
                                  <MenuItem />
                                )}
                              </Select>
                            );
                          } else if (
                            item.display_type == "integer" ||
                            item.display_type == "long" ||
                            item.display_type == "int"
                          ) {
                            return (
                              <TextField
                                key={item.ckey}
                                id={item.ckey}
                                label={item.display_name}
                                value={
                                  this.state.data.datasource_configs_attributes[
                                    idx
                                  ]
                                    ? this.state.data
                                        .datasource_configs_attributes[idx]
                                        .value
                                    : item.default_value
                                }
                                onChange={e =>
                                  this.handleMetadata(idx, item.id, e)
                                }
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true
                                }}
                                margin="normal"
                              />
                            );
                          } else if (item.display_type == "boolean") {
                            return (
                              <FormControlLabel
                                style={switchValue}
                                control={
                                  <Switch
                                    key={item.ckey}
                                    checked={
                                      this.state.data
                                        .datasource_configs_attributes[idx]
                                        ? this.state.data
                                            .datasource_configs_attributes[idx]
                                            .value
                                        : item.default_value
                                    }
                                    onChange={e =>
                                      this.handleBoolean(idx, item.id, e)
                                    }
                                    color="primary"
                                  />
                                }
                                label={item.display_name}
                              />
                            );
                          } else if (item.display_type == "password") {
                            return (
                              <TextField
                                key={item.ckey}
                                id={item.ckey}
                                label={item.display_name}
                                value={
                                  this.state.data.datasource_configs_attributes[
                                    idx
                                  ]
                                    ? this.state.data
                                        .datasource_configs_attributes[idx]
                                        .value
                                    : item.default_value
                                }
                                onChange={e =>
                                  this.handleMetadata(idx, item.id, e)
                                }
                                type="password"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true
                                }}
                                margin="normal"
                              />
                            );
                          } else if (
                            item.display_type == "multi-text element"
                          ) {
                            return (
                              <TextField
                                id={item.ckey}
                                label={item.display_name}
                                className={classes.textField}
                                value={
                                  this.state.data.datasource_configs_attributes[
                                    idx
                                  ]
                                    ? this.state.data
                                        .datasource_configs_attributes[idx]
                                        .value
                                    : item.default_value
                                }
                                onChange={e =>
                                  this.handleMetadata(idx, item.id, e)
                                }
                                margin="normal"
                              />
                            );
                          } else if (item.display_type == "class") {
                            return <div>Class</div>;
                          } else {
                            return (
                              <TextField
                                id={item.ckey}
                                label={item.display_name}
                                className={classes.textField}
                                value={
                                  this.state.data.datasource_configs_attributes[
                                    idx
                                  ]
                                    ? this.state.data
                                        .datasource_configs_attributes[idx]
                                        .value
                                    : item.default_value
                                }
                                onChange={e =>
                                  this.handleMetadata(idx, item.id, e)
                                }
                                margin="normal"
                              />
                            );
                          }
                        })()}
                      </GridItem>
                    ))}
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </form>
    );
  }
}

ConnectorForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConnectorForm);
