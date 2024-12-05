import React from 'react';

const Navbarad = () => {
  return (
    <nav className="navbar">
      <div className="col-12">
        <div className="navbar-header">
          <button
            aria-label="Toggle Sidebar"
            className="bars"
          ></button>
          <a className="navbar-brand" href="index.html">
            <img src="assets/images/logo.svg" width="30" alt="Compass" />
            <span className="m-l-10">Estate</span>
          </a>
        </div>

        <ul className="nav navbar-nav navbar-left">
          <li>
            <button
              aria-label="Toggle Sidebar"
              className="ls-toggle-btn"
              data-close="true"
            >
              <i className="zmdi zmdi-swap"></i>
            </button>
          </li>
          <li className="hidden-sm-down">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search..." />
              <span className="input-group-addon">
                <i className="zmdi zmdi-search"></i>
              </span>
            </div>
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          {/* Notifications Dropdown */}
          <li className="dropdown">
            <button
              aria-label="Notifications"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
            >
              <i className="zmdi zmdi-notifications"></i>
              <div className="notify">
                <span className="heartbit"></span>
                <span className="point"></span>
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-right slideDown">
              <li className="header">NOTIFICATIONS</li>
              <li className="body">
                <ul className="menu list-unstyled">
                  {/* Notification Example */}
                  <li>
                    <a href="javascript:void(0);">
                      <div className="icon-circle bg-blue">
                        <i className="zmdi zmdi-account"></i>
                      </div>
                      <div className="menu-info">
                        <h4>8 New Members joined</h4>
                        <p><i className="zmdi zmdi-time"></i> 14 mins ago </p>
                      </div>
                    </a>
                  </li>
                  {/* Add more notifications here */}
                </ul>
              </li>
              <li className="footer">
                <a href="javascript:void(0);">View All Notifications</a>
              </li>
            </ul>
          </li>

          {/* Tasks Dropdown */}
          <li className="dropdown">
            <button
              aria-label="Tasks"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
            >
              <i className="zmdi zmdi-flag"></i>
              <div className="notify">
                <span className="heartbit"></span>
                <span className="point"></span>
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-right slideDown">
              <li className="header">TASKS</li>
              <li className="body">
                <ul className="menu tasks list-unstyled">
                  {/* Task Example */}
                  <li>
                    <a href="javascript:void(0);">
                      <div className="progress-container progress-primary">
                        <span className="progress-badge">Footer display issue</span>
                        <div className="progress">
                          <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100" style={{ width: '86%' }}>
                            <span className="progress-value">86%</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                  {/* Add more tasks here */}
                </ul>
              </li>
              <li className="footer">
                <a href="javascript:void(0);">View All</a>
              </li>
            </ul>
          </li>

          {/* Fullscreen Button */}
          <li>
            <button
              aria-label="Toggle Fullscreen"
              className="fullscreen hidden-sm-down"
              data-provide="fullscreen"
              data-close="true"
            >
              <i className="zmdi zmdi-fullscreen"></i>
            </button>
          </li>

          {/* Power Off Button */}
          <li>
            <a href="sign-in.html" className="mega-menu" data-close="true">
              <i className="zmdi zmdi-power"></i>
            </a>
          </li>

          {/* Settings Button */}
          <li>
            <button
              aria-label="Open Settings"
              className="js-right-sidebar"
              data-close="true"
            >
              <i className="zmdi zmdi-settings zmdi-hc-spin"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbarad;
