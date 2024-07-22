import React from 'react';
import { Container, Typography, Card, CardContent, styled } from '@mui/material';

const StyledContainer = styled(Container)`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCard = styled(Card)`
  width: 80%;
  margin-bottom: 20px;
`;

const FortescueForm = () => {
  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Fortescue Metals Group
      </Typography>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            About Fortescue Metals Group
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Fortescue Metals Group Ltd (FMG) is a global leader in the iron ore industry,
            recognized for its world-class mining and infrastructure assets in the Pilbara, Western Australia.
            Founded in 2003, Fortescue has discovered and developed significant iron ore deposits and constructed
            some of the most substantial mines globally. Fortescue’s operations span across exploration, development,
            production, processing, and transport of iron ore.
          </Typography>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Vision and Values
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Fortescue is dedicated to delivering consistent returns for its shareholders while maintaining a focus on
            environmental stewardship and community development. The company’s core values include safety, family,
            empowerment, enthusiasm, determination, and generating ideas to improve the business.
          </Typography>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Sustainability and Innovation
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Fortescue is committed to sustainability and innovation, aiming to reach net-zero operational emissions by 2030.
            The company invests heavily in renewable energy projects and green hydrogen initiatives, striving to reduce its
            environmental footprint and lead the way in the global transition to a low-carbon future.
          </Typography>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default FortescueForm;
