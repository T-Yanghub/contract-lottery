import React, { Component } from 'react';
import {Message,  Container, Card, Icon,Image,Label,Button,Statistic} from 'semantic-ui-react';
import lottery from './contract';
import web3 from "./web";


class App extends Component {
   state={
      manager:"",
       players:0,
       balance:0,
       loading:false,
      buttonHide:'none'
   }

  async  componentDidMount(){
       let address =await lottery.methods.getManager().call();
      const playersCount = await  lottery.methods.getPlayersCount().call();
      const balance = await  lottery.methods.getBalance().call();
      this.setState({players:playersCount});
      this.setState({balance:web3.utils.fromWei(balance,'ether')});

      this.setState({
           manager:address
      });
      const accounts = await web3.eth.getAccounts();
      if (accounts[0]==this.state.manager){
          this.setState({
              buttonHide:'inline'
          });
      }

    }

    enter=async()=>{
       this.setState({
           loading:true
       })
        const accounts = await web3.eth.getAccounts();
       await lottery.methods.enter().send({
            from:accounts[0],
           value:'1000000000000000000'
        });

        this.setState({
            loading:false
        });
        window.location.reload(true);
    }
    pickWinner=async()=>{
        this.setState({
            loading:true
        })
        const accounts = await web3.eth.getAccounts();
       await lottery.methods.pickWinner().send({
           from:accounts[0]
       })
        this.setState({
            loading:false
        })
        window.location.reload(true);
    }
    refund=async()=>{
        this.setState({
            loading:true
        });
        const accounts = await web3.eth.getAccounts();
        await  lottery.methods.refund().send({
            from :accounts[0]
        });
        this.setState({
            loading:true
        })
    }

  render() {
      console.log(web3.version)

    return (


        <Container>
            <br/>
            <Message info>
                <Message.Header>区块链彩票</Message.Header>
                <p>快来买呀,越买越发财?</p>
            </Message>
            <Card>
                <Image src='/images/logo.jpg' />
                <Card.Content>
                    <Card.Header>六合彩</Card.Header>
                    <Card.Meta>
                        <p>管理员地址:</p>
                        <Label size='mini'>
                            {this.state.manager}
                        </Label>
                        <Statistic color='red'>
                            <Statistic.Value>{(this.state.balance)} ether </Statistic.Value>
                        </Statistic>
                    </Card.Meta>
                    <Card.Description>每周三晚上8点准时开奖.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        {this.state.players}参与人数
                    </a>

                </Card.Content>
                <Button animated='fade' loading={this.state.loading}  onClick={this.enter}>
                    <Button.Content visible >点击购买</Button.Content>
                    <Button.Content hidden>祝您好运</Button.Content>
                </Button>
                <Button positive style={{display:this.state.buttonHide}} loading={this.state.loading}  onClick={this.pickWinner}>开奖</Button>
                <Button style={{display:this.state.buttonHide}}loading={this.state.loading} onClick={this.refund}>取消</Button>
            </Card>


        </Container>
    );
  }
}

export default App;
