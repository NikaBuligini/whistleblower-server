const React = require('react');
const { findDOMNode } = require('react-dom');
const scrollIntoView = require('dom-scroll-into-view');

const _debugStates = [];

const Autocomplete = React.createClass({

  propTypes: {
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    shouldItemRender: React.PropTypes.func,
    sortItems: React.PropTypes.func,
    getItemValue: React.PropTypes.func.isRequired,
    renderItem: React.PropTypes.func.isRequired,
    renderMenu: React.PropTypes.func,
    menuStyle: React.PropTypes.object,
    inputProps: React.PropTypes.object,
    wrapperProps: React.PropTypes.object,
    wrapperStyle: React.PropTypes.object,
    autoHighlight: React.PropTypes.bool,
    onMenuVisibilityChange: React.PropTypes.func,
    open: React.PropTypes.bool,
    debug: React.PropTypes.bool,
    inputLabel: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      value: '',
      wrapperProps: {},
      wrapperStyle: {
        display: 'inline-block',
      },
      inputProps: {},
      onChange() {},
      onSelect() {},
      renderMenu(items, value, style) {
        return (
          <div style={{ ...style, ...this.menuStyle }}>
            {items}
          </div>
        );
      },
      shouldItemRender() { return true; },
      menuStyle: {
        borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 0',
        fontSize: '90%',
        position: 'absolute',
        overflow: 'auto',
        maxHeight: '180px', // TODO: don't cheat, let it flow to the bottom
      },
      autoHighlight: true,
      onMenuVisibilityChange() {},
    };
  },

  getInitialState() {
    return {
      isOpen: false,
      highlightedIndex: null,
    };
  },

  componentWillMount() {
    this._ignoreBlur = false;
    this._performAutoCompleteOnUpdate = false;
    this._performAutoCompleteOnKeyUp = false;
  },

  componentWillReceiveProps(nextProps) {
    this._performAutoCompleteOnUpdate = true;
    // If `items` has changed we want to reset `highlightedIndex`
    // since it probably no longer refers to a relevant item
    if (this.props.items !== nextProps.items ||
      // The entries in `items` may have been changed even though the
      // object reference remains the same, double check by seeing
      // if `highlightedIndex` points to an existing item
      this.state.highlightedIndex >= nextProps.items.length) {
      this.setState({ highlightedIndex: null });
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen === true && prevState.isOpen === false) {
      this.setMenuPositions();
    }

    if (this.state.isOpen && this._performAutoCompleteOnUpdate) {
      this._performAutoCompleteOnUpdate = false;
      this.maybeAutoCompleteText();
    }

    this.maybeScrollItemIntoView();
    if (prevState.isOpen !== this.state.isOpen) {
      this.props.onMenuVisibilityChange(this.state.isOpen);
    }
  },

  maybeScrollItemIntoView() {
    if (this.state.isOpen === true && this.state.highlightedIndex !== null) {
      const itemNode = this.refs[`item-${this.state.highlightedIndex}`];
      const menuNode = this.refs.menu;
      scrollIntoView(
        findDOMNode(itemNode),
        findDOMNode(menuNode),
        { onlyScrollIfNeeded: true },
      );
    }
  },

  handleKeyDown(event) {
    if (this.keyDownHandlers[event.key]) {
      this.keyDownHandlers[event.key].call(this, event);
    } else {
      this.setState({
        highlightedIndex: null,
        isOpen: true,
      });
    }
  },

  handleChange(event) {
    this._performAutoCompleteOnKeyUp = true;
    this.props.onChange(event, event.target.value);
  },

  handleKeyUp() {
    if (this._performAutoCompleteOnKeyUp) {
      this._performAutoCompleteOnKeyUp = false;
      this.maybeAutoCompleteText();
    }
  },

  keyDownHandlers: {
    ArrowDown(event) {
      event.preventDefault();
      const itemsLength = this.getFilteredItems().length;
      if (!itemsLength) return;
      const { highlightedIndex } = this.state;
      const index = (
        highlightedIndex === null ||
        highlightedIndex === itemsLength - 1
      ) ? 0 : highlightedIndex + 1;
      this._performAutoCompleteOnKeyUp = true;
      this.setState({
        highlightedIndex: index,
        isOpen: true,
      });
    },

    ArrowUp(event) {
      event.preventDefault();
      const itemsLength = this.getFilteredItems().length;
      if (!itemsLength) return;
      const { highlightedIndex } = this.state;
      const index = (
        highlightedIndex === 0 ||
        highlightedIndex === null
      ) ? itemsLength - 1 : highlightedIndex - 1;
      this._performAutoCompleteOnKeyUp = true;
      this.setState({
        highlightedIndex: index,
        isOpen: true,
      });
    },

    Enter(event) {
      if (this.state.isOpen === false) {
        // menu is closed so there is no selection to accept -> do nothing

      } else if (this.state.highlightedIndex == null) {
        // input has focus but no menu item is selected + enter is hit -> close the menu,
        // highlight whatever's in input
        this.setState({
          isOpen: false,
        }, () => {
          this.refs.input.select();
        });
      } else {
        // text entered + menu item has been highlighted + enter is hit -> update value to
        // that of selected menu item, close the menu
        event.preventDefault();
        const item = this.getFilteredItems()[this.state.highlightedIndex];
        const value = this.props.getItemValue(item);
        this.setState({
          isOpen: false,
          highlightedIndex: null,
        }, () => {
          // this.refs.input.focus() // TODO: file issue
          this.refs.input.setSelectionRange(
            value.length,
            value.length,
          );
          this.props.onSelect(value, item);
        });
      }
    },

    Escape() {
      this.setState({
        highlightedIndex: null,
        isOpen: false,
      });
    },
  },

  getFilteredItems() {
    let items = this.props.items;

    if (this.props.shouldItemRender) {
      items = items.filter(item => (
        this.props.shouldItemRender(item, this.props.value)
      ));
    }

    if (this.props.sortItems) {
      items.sort((a, b) => (
        this.props.sortItems(a, b, this.props.value)
      ));
    }

    return items;
  },

  maybeAutoCompleteText() {
    if (!this.props.autoHighlight || this.props.value === '') { return; }
    const { highlightedIndex } = this.state;
    const items = this.getFilteredItems();
    if (items.length === 0) { return; }
    const matchedItem = highlightedIndex !== null ?
      items[highlightedIndex] : items[0];
    const itemValue = this.props.getItemValue(matchedItem);
    const itemValueDoesMatch = (itemValue.toLowerCase().indexOf(
      this.props.value.toLowerCase(),
    ) === 0);
    if (itemValueDoesMatch && highlightedIndex === null) { this.setState({ highlightedIndex: 0 }); }
  },

  setMenuPositions() {
    const node = this.refs.input;
    const rect = node.getBoundingClientRect();
    const computedStyle = global.window.getComputedStyle(node);
    const marginLeft = parseInt(computedStyle.marginLeft, 10) || 0;
    const marginRight = parseInt(computedStyle.marginRight, 10) || 0;
    this.setState({
      menuWidth: rect.width + marginLeft + marginRight,
    });
  },

  highlightItemFromMouse(index) {
    this.setState({ highlightedIndex: index });
  },

  selectItemFromMouse(item) {
    const value = this.props.getItemValue(item);
    this.setState({
      isOpen: false,
      highlightedIndex: null,
    }, () => {
      this.props.onSelect(value, item);
      this.refs.input.focus();
    });
  },

  setIgnoreBlur(ignore) {
    this._ignoreBlur = ignore;
  },

  renderMenu() {
    const items = this.getFilteredItems().map((item, index) => {
      const element = this.props.renderItem(
        item,
        this.state.highlightedIndex === index,
        { cursor: 'default' },
      );
      return React.cloneElement(element, {
        // Ignore blur to prevent menu from de-rendering before we can process click
        onMouseDown: () => this.setIgnoreBlur(true),
        onMouseEnter: () => this.highlightItemFromMouse(index),
        onClick: () => this.selectItemFromMouse(item),
        ref: `item-${index}`,
      });
    });
    const style = {
      minWidth: this.state.menuWidth,
    };
    const menu = this.props.renderMenu(items, this.props.value, style);
    return React.cloneElement(menu, { ref: 'menu' });
  },

  handleInputBlur() {
    if (this._ignoreBlur) { return; }
    this.setState({
      isOpen: false,
      highlightedIndex: null,
    });
  },

  handleInputFocus() {
    if (this._ignoreBlur) {
      this.setIgnoreBlur(false);
      return;
    }
    // We don't want `selectItemFromMouse` to trigger when
    // the user clicks into the input to focus it, so set this
    // flag to cancel out the logic in `handleInputClick`.
    // The event order is:  MouseDown -> Focus -> MouseUp -> Click
    this._ignoreClick = true;
    this.setState({ isOpen: true });
  },

  isInputFocused() {
    let el = this.refs.input;
    return el.ownerDocument && (el === el.ownerDocument.activeElement);
  },

  handleInputClick() {
    // Input will not be focused if it's disabled
    if (this.isInputFocused() && this.state.isOpen === false) {
      this.setState({ isOpen: true });
    } else if (this.state.highlightedIndex !== null && !this._ignoreClick) {
      this.selectItemFromMouse(this.getFilteredItems()[this.state.highlightedIndex]);
    }
    this._ignoreClick = false;
  },

  composeEventHandlers(internal, external) {
    return external
      ? (e) => { internal(e); external(e); }
      : internal;
  },

  render() {
    if (this.props.debug) { // you don't like it, you love it
      _debugStates.push({
        id: _debugStates.length,
        state: this.state,
      });
    }

    const { inputProps } = this.props;
    return (
      <div style={{ ...this.props.wrapperStyle }} {...this.props.wrapperProps}>
        <input
          {...inputProps}
          className="mdl-textfield__input"
          role="combobox"
          aria-autocomplete="list"
          autoComplete="off"
          ref="input"
          onFocus={this.composeEventHandlers(this.handleInputFocus, inputProps.onFocus)}
          onBlur={this.composeEventHandlers(this.handleInputBlur, inputProps.onBlur)}
          onChange={this.handleChange}
          onKeyDown={this.composeEventHandlers(this.handleKeyDown, inputProps.onKeyDown)}
          onKeyUp={this.composeEventHandlers(this.handleKeyUp, inputProps.onKeyUp)}
          onClick={this.composeEventHandlers(this.handleInputClick, inputProps.onClick)}
          value={this.props.value}
        />
        {this.props.inputLabel && this.props.inputLabel()}
        {('open' in this.props ? this.props.open : this.state.isOpen) && this.renderMenu()}
        {this.props.debug && (
          <pre style={{ marginLeft: 300 }}>
            {JSON.stringify(_debugStates.slice(_debugStates.length - 5, _debugStates.length), null, 2)}
          </pre>
        )}
      </div>
    );
  },
});

module.exports = Autocomplete;
