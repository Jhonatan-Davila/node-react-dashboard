import React, { Component } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";

const styles = createStyles({
  footer: {
    padding: "60px 0",
    width: "100%",
    background: "#858585",
    color: "#fff"
  },
  footerTitle: {
    position: "relative",
    color: "#fff",
    fontSize: "18px",
    fontWeight: 600,
    marginTop: "3px",
    marginBottom: "20px",
    /*border-bottom: 1px solid #4e4e4e;  m-t-5 m-b-20 p-b-8*/

    "& ::after": {
      position: "absolute",
      content: "",
      left: 0,
      bottom: 0,
      width: "30px",
      height: "4px",
      background: "#ff304d"
    }
  },
  footerLinks: {
    "& a": {
      padding: "3px 0",
      /*border-bottom: 1px solid #404040;*/
      color: "#fff",
      display: "block",
      transition: "color 0.5s ease-in-out",
      textDecoration: "none",
      fontSize: "16px"
    },
    "& a:hover": {
      color: "#ff304d"
    }
  },
  footerBottom: {
    width: "100%",
    padding: "25px 10",
    color: "#fff",
    background: "#858585"
  },
  CopyrightLeft: {
    textAlign: "left"
  },
  CopyrightRight: {
    textAlign: "right"
  }
});

interface IFooterProps extends WithStyles<typeof styles> {
  category: string;
}

interface IFooterState extends IFooterProps {}

class Footer extends Component<IFooterProps, IFooterState> {
  state: IFooterState;

  constructor(props) {
    super(props);

    this.state = { ...props };
  }

  render() {
    let { classes } = this.props;

    return (
      <footer>
        <div>
          <div className="row">
            <div className="col-md-12">
              <footer className={classes.footer}>
                <div className="container">
                  <div className={classes.footerTitle}></div>
                  <div className="row">
                    <div className="col-md-4 m-b-30">
                      <div className={classes.footerTitle}>Most Popular</div>
                      <div className={classes.footerLinks}>
                        <a href="/#">Lorem Ipsum</a>
                        <a href="/#">dolor sit amet</a>
                        <a href="/#">consectetur adipiscing</a>
                        <a href="/#">exercitation ullamco</a>
                      </div>
                    </div>
                    <div className="col-md-4 m-b-30">
                      <div className={classes.footerTitle}>
                      Sed ut perspiciatis
                      </div>
                      <div className={classes.footerLinks}>
                        <a href="/#">voluptatem accusantium</a>
                        <a href="/#">qui ratione</a>
                        <a href="/#">Quis autem</a>
                      </div>
                      <br />
                      <div className={classes.footerTitle}>At vero</div>
                      <div className={classes.footerLinks}>
                        <a href="/#">et iusto</a>
                        <a href="/#"> rerum facilis </a>
                        <a href="/#">necessitatibus</a>
                      </div>
                    </div>
                    <div className="col-md-4 m-b-30">
                      <div className={classes.footerTitle}>Quis autem</div>
                      <div className={classes.footerLinks}>
                        <a href="/#">qui ratione</a>
                        <a href="/#">consectetur adipiscing</a>
                        <a href="/#">E-mail</a>
                        <a href="/#">Base Histórica de Processos</a>
                        <a href="/#">PayCheck</a>
                        <a href="/#">Confluence</a>
                        <a href="/#">Aloc</a>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4 m-b-30">
                      <div className={classes.footerTitle}>Vagas</div>
                      <div className={classes.footerLinks}>
                        <a href="/#">Vagas Abertas</a>
                        <a href="/#">Indicação Premiada</a>
                      </div>
                      <br />
                      <div className={classes.footerTitle}>Inovação</div>
                      <div className={classes.footerLinks}>
                        <a href="/#">Áreas e Plataformas</a>
                        <a href="/#">Politica de Apoio à Inovação</a>
                        <a href="/#">Tomorrow Lab</a>
                        <a href="/#">Grupos de Estudo</a>
                      </div>
                    </div>
                    <div className="col-md-4 m-b-30">
                      <div className={classes.footerTitle}>Serviços</div>
                      <div className={classes.footerLinks}>
                        <a href="/#">Contracheque</a>
                        <a href="/#">Imposto de Renda</a>
                        <a href="/#">Declarações</a>
                        <a href="/#">Safari Boots</a>
                        <a href="/#">Ramais e Emails</a>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4 m-b-30">
                      <div className={classes.footerTitle}>Benefícios</div>
                      <div className={classes.footerLinks}>
                        <a href="/#">Descontos</a>
                        <a href="/#">Parcerias</a>
                        <a href="/#">Previdência Sistel</a>
                        <a href="/#">Sodexo</a>
                        <a href="/#">Plano de Saúde</a>
                        <a href="/#">Home Office</a>
                      </div>
                    </div>
                    <div className="col-md-4 m-b-30">
                      <div className={classes.footerTitle}>Viagem</div>
                      <div className={classes.footerLinks}>
                        <a href="/#">Templates</a>
                        <a href="/#">Orientações</a>
                        <a href="/#">Documentação</a>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
              <div className={classes.footerBottom}>
                <div className={classes.CopyrightLeft}>DASHBOARD</div>
                <div className={classes.CopyrightRight}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  componentDidMount() {}
}

export default withStyles(styles)(Footer);