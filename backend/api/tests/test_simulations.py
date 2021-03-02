"""PyTest simulations.py"""

from mock import patch

from api.simulations import Simulations


def test_simulations(mocker):
    """Check simulations is fetching, saving and returning
    a correctly formatted dictionary

    :param mocker: magic mock
    :return: None
    """
    with patch.object(Simulations, "__init__", lambda x: None):
        bounding_box = (13.3401, 52.5279, 13.5063, 52.5629)

        mock_get_bounding_box = mocker.patch(
            "api.simulations.Simulations._get_bounding_box",
            return_value=bounding_box
        )
        mock_save_booking_distance = mocker.patch(
            "api.simulations.Simulations._save_booking_distance"
        )

        simulations = Simulations()
        data = simulations.get()

        for key in data:
            assert key in [
                "booking_distance_bins",
                "most_popular_dropoff_points",
                "most_popular_pickup_points",
                "bounding_box"
            ]

        assert data["bounding_box"] == bounding_box
        assert mock_get_bounding_box.called is True
        assert mock_save_booking_distance.called is True
