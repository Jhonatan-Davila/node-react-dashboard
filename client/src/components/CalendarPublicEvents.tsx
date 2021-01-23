import React, { useState, useEffect } from 'react';
import { useAuth0 } from "../react-auth0-wrapper";
import config from '../config.json';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { ListItemIcon, Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const CalendarPublicEvents = () => {
    const [data, setData] = useState();
    const { loading, user, getTokenSilently } = useAuth0();

 

    useEffect(() => {
        const fetchData = async () => {
            if (loading || !user)
                return;
            const token = await getTokenSilently();
            const response = await fetch(config.intranet_api_domain + '/api/calendar/public-events?user=' + user.email, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            try{
                const responseData = await response.json(); 
                setData(responseData);
                if (!response.ok) {
                    alert("status : "+response.status +' '+ response.statusText );
                  }

            } catch (e) {
                alert(" mensagem erro "+e.message );
                setData(null);
            }
        };
        fetchData();
    }, [user, loading]);

    if (!data) {
        return (<div>Loading data...</div>);
    }
    
    if (data && data.length === 0)
        return (<div>Não há eventos próximos</div>);
    
    if(Object.getOwnPropertyNames(data).includes('error'))
        return (<div>Ocorreu um erro ao carregar os eventos!</div>); 
    
    return (
        <>
        <Card style={{marginTop: 50, minHeight: 400,
        marginLeft: 10}} > 
              <CardHeader
                titleTypographyProps={{ variant: "subtitle2" }}
              />
              <CardContent>
            <Typography
                component="span"
                variant="body2"
                color="textPrimary">
                Próximos Eventos
            </Typography>
            <List  component="nav" aria-label="main mailbox folders">
                {data.map((item, i) => {
                    return (
                        <ListItem alignItems="flex-start" key={i}>
                            <ListItemIcon>
                                <Badge badgeContent={item.confirmedAttendees} color="primary">
                                    <MailIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText
                                primary={item.summary}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary" 
                                        >
                                            {item.description}
                                        </Typography>
                                        {(new Date()).toLocaleDateString('pt-BR',item.start)} 
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    );
                })}
            </List>
           </CardContent>
         </Card>
        </>
    );
};

export default CalendarPublicEvents;