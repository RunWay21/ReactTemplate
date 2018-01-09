import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { Field, Control, Select, Input } from 'root/ui';

import { filterToLocation } from 'root/utils/url';

class StringFilter extends React.Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        field: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            type: 'contains'
        }
        this.updateUrl = debounce(this.updateUrl, 500);
    }

    componentWillMount() {
        this.getCurrentState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filter.filters !== this.props.filter.filters)
            this.getCurrentState(nextProps);
    }

    updateUrl() {
        let filtersArray = this.props.filter.filters;
        if (!filtersArray) filtersArray = [];
        if (this.state.value) {
            let filterObject = filtersArray.find(x => x.field === this.props.field);
            if (!filterObject)
                filtersArray.push({ field: this.props.field, type: this.state.type, value: this.state.value });
            else {
                filterObject.value = this.state.value;
                filterObject.type = this.state.type;
            }
        }
        else {
            filtersArray = filtersArray.filter(x => x.field !== this.props.field);
        }
        this.props.history.push(filterToLocation(this.props.location.pathname, { ...this.props.filter, filters: filtersArray }));
    }

    getCurrentState(props) {
        console.log('getCurrentState');
        let filtersArray = props.filter.filters;
        if (filtersArray) {
            let filterObject = filtersArray.find(x => x.field === props.field);
            if (filterObject) {
                this.setState({ value: filterObject.value, type: filterObject.type });
                return;
            }
        }
        this.setState({ value: '' });
    }


    handleTypeChange(event) {
        event.preventDefault();
        this.setState({ type: event.target.value });
        this.updateUrl();
    }

    handleValueChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
        this.updateUrl();
    }

    render() {
        const { placeholder } = this.props;
        return (
            <Field addons>
                <Control>
                    <Select value={this.state.type} onChange={x => this.handleTypeChange(x)}>
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                    </Select>
                </Control>
                <Control>
                    <Input placeholder={placeholder} value={this.state.value} onChange={x => this.handleValueChange(x)}></Input>
                </Control>
            </Field>
        );
    }
}

export default withRouter(StringFilter);