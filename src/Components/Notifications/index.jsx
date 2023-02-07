import {
  ActionIcon,
  Button,
  Group,
  Indicator,
  Menu,
  Text,
} from "@mantine/core";
import React from "react";
import { Bell } from "tabler-icons-react";
import { Notification } from "@mantine/core";
import { useState } from "react";
import moment from "moment/moment";
import { useEffect } from "react";
// import { axiosGet, axiosPost } from "../../Helpers";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

const Notifications = ({ allNotification, unreadCount }) => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [opened, setOpened] = useState(false);

  // const getMyNotifications = async () => {
  //   axiosGet(`user/getUserNotification/${user.id}`).then((res) => {
  //     if (res?.data?.status && res?.data?.data?.length > 0) {
  //       setAllNotifications(res.data.data);
  //     }
  //   });
  // };

  // const markNotificationAsRead = (notification) => {
  //   axiosPost(`user/notificationMarkRead`, {
  //     userId: user.id,
  //     notificationId: notification._id,
  //   })
  //     .then((res) => {
  //       if (res?.data?.status) {
  //         setGetNotifications(!getNotifications);
  //         switch (notification.notificationType) {
  //           case "addJob":
  //             navigate(`/job/${notification.navigationId}`);
  //             break;
  //           case "follow":
  //             navigate(`/jobSeeker/profile/${notification.navigationId}`);
  //             break;
  //           case "company":
  //             navigate(`/jobSeeker/companyPosts/${notification.navigationId}`);
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const matches = useMediaQuery("(min-width: 600px)");

  // useEffect(() => {
  //   getMyNotifications();
  // }, [getNotifications]);

  return (
    <Menu
      styles={{
        dropdown: {
          maxHeight: "90vh",
          overflowY: "scroll",
          overflowX: "hidden",
        },
      }}
      withArrow
      shadow="md"
      width={!matches ? 350 : 500}
      position="bottom"
      transition="pop"
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <Indicator
          styles={{}}
          label={unreadCount}
          inline
          size={15}
          showZero={false}
          dot={false}
          processing
        >
          <ActionIcon
            variant="transparent"
            size={30}
            style={{
              color: !opened ? "white" : "rgb(215, 77, 72)",
            }}
          >
            <Bell size={30} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>{" "}
      <Menu.Dropdown>
        {/* <Group position="right">
          <Button
            hidden={
              allNotifications.length === 0 || unreadCount === 0 ? true : false
            }
            variant="subtle"
            onClick={() => {}}
          >
            Mark All As Read
          </Button>
        </Group> */}
        {allNotifications.length ? (
          allNotifications?.map((notification, index) => {
            if (!notification.read) {
              return (
                <Menu.Item key={index}>
                  <Notification
                    // onClick={() => {
                    //   markNotificationAsRead(notification);
                    // }}
                    styles={{
                      title: { justifyContent: "space-between" },
                    }}
                    disallowClose
                    title={`${notification.title}`}
                  >
                    <Group position="apart">
                      <Text>{notification.message}</Text>
                      {moment(Date.now()).diff(
                        notification.createdDate,
                        "seconds"
                      ) < 60 ? (
                        <Text color="dimmed">less than a minute ago</Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "minutes"
                        ) < 60 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "minutes"
                          )}{" "}
                          mins ago
                        </Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "hours"
                        ) < 24 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "hours"
                          )}{" "}
                          hours ago
                        </Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "days"
                        ) < 7 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "days"
                          )}
                          days ago
                        </Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "weeks"
                        ) < 4 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "weeks"
                          )}{" "}
                          weeks ago
                        </Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "months"
                        ) < 12 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "months"
                          )}{" "}
                          months ago
                        </Text>
                      ) : (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "years"
                          )}{" "}
                          Years ago
                        </Text>
                      )}
                    </Group>
                  </Notification>
                </Menu.Item>
                // </Anchor>
              );
            } else if (notification.read) {
              return (
                <Menu.Item key={index}>
                  <Notification
                    styles={{
                      title: { justifyContent: "space-between" },
                    }}
                    color="green"
                    disallowClose
                    title={`${notification.title}`}
                    // icon={<Check />}
                  >
                    <Group position="apart">
                      <Text>{notification.message}</Text>
                      {moment(Date.now()).diff(
                        notification.createdDate,
                        "seconds"
                      ) < 60 ? (
                        <Text color="dimmed">less than a minute ago</Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "minutes"
                        ) < 60 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "minutes"
                          )}{" "}
                          mins ago
                        </Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "hours"
                        ) < 24 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "hours"
                          )}{" "}
                          hours ago
                        </Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "days"
                        ) < 7 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "days"
                          )}
                          days ago
                        </Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "weeks"
                        ) < 4 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "weeks"
                          )}{" "}
                          weeks ago
                        </Text>
                      ) : moment(Date.now()).diff(
                          notification.createdDate,
                          "months"
                        ) < 12 ? (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "months"
                          )}{" "}
                          months ago
                        </Text>
                      ) : (
                        <Text color="dimmed">
                          {moment(Date.now()).diff(
                            notification.createdDate,
                            "years"
                          )}{" "}
                          Years ago
                        </Text>
                      )}
                    </Group>
                  </Notification>
                </Menu.Item>
              );
            }
          })
        ) : (
          <h5 className="text-dark text-center p-3">No Notification</h5>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default Notifications;
