import React, {Component} from "react";
import {connect} from "react-redux";
import GenerateWallet from "./GenerateWallet/components";
import {SHOW_GENERATE_WALLET_PASSWORD_ACTION, GENERATE_WALLET_FILE_ACTION} from "actions/generateWallet";
import PropTypes from "prop-types";

class Tabs extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        generateWalletPassword: PropTypes.object,
        showPassword: PropTypes.bool,
        showGenerateWalletPasswordAction: PropTypes.func,
        generateWalletFileAction: PropTypes.func,
        generateWalletFile: PropTypes.bool
    }

    render() {

        let {
            generateWalletPassword,
            showPassword,
            showGenerateWalletPasswordAction,
            generateWalletFileAction,
            generateWalletFile
        } = this.props;

        let props = {
            generateWalletPassword,
            showPassword,
            showGenerateWalletPasswordAction,
            generateWalletFileAction,
            generateWalletFile
        }

        return (
            <GenerateWallet {...props}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        generateWalletPassword: state.form.generateWalletPassword,
        generateWalletFile: state.generateWallet.generateWalletFile,
        showPassword: state.generateWallet.showPassword
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showGenerateWalletPasswordAction: () => {
            dispatch(SHOW_GENERATE_WALLET_PASSWORD_ACTION())
        },
        generateWalletFileAction: () => {
            dispatch(GENERATE_WALLET_FILE_ACTION())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
