import { userService } from '../services';

export const commonService = {
    handleResponse
};

function handleResponse(response) {

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(data => {
              if (!response.ok) {
                  if (response.status === 401) {
                      // auto logout if 401 response returned from api
                      userService.logout();
                       window.location.reload(true);
                  }
                  if(Array.isArray(data)) {
                    return Promise.reject(data[0].message);
                  } else {
                    return Promise.reject(data.message);
                  }
              }
              return data;

        });
    }
    else{

        return response.text().then(text => {

                if (!response.ok) {
                    if (response.status === 401) {
                        // auto logout if 401 response returned from api
                        userService.logout();
                         window.location.reload(true);
                    }
                    if(response.status === 409) {
                      return Promise.reject(text);
                    } else {
                      return Promise.reject(response.statusText);
                    }
                }
                return text;
            });

    }
}