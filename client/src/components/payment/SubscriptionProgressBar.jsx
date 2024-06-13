import { useEffect, useState } from "react";
import { server } from "../../server";

const SubscriptionProgressBar = ({ userId }) => {
  const [planExpirationDate, setPlanExpirationDate] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${server}/payment/users/${userId}/subscription`
        );
        const data = await response.json();
        setPlanExpirationDate(data.planExpirationDate);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (planExpirationDate) {
      const calculateDaysRemaining = () => {
        const expirationDate = new Date(planExpirationDate);
        const today = new Date();
        const timeDiff = expirationDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysLeft;
      };

      const daysLeft = calculateDaysRemaining();
      setDaysRemaining(daysLeft);
    }
  }, [planExpirationDate]);

  return (
    <div>
      <p>Số ngày còn lại: {daysRemaining}</p>
      <progress value={daysRemaining} max={30} />
    </div>
  );
};

export default SubscriptionProgressBar;
